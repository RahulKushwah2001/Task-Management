from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt
from sqlalchemy.orm import Session

from app.core.config import settings
from app.db.deps import get_db
from app.models.user import User

security = HTTPBearer()

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):
    token = credentials.credentials

    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_email = payload.get("sub")

        user = db.query(User).filter(User.email == user_email).first()

        if user is None:
            raise HTTPException(status_code=401, detail="User not found")

        return user

    except:
        raise HTTPException(status_code=401, detail="Invalid token")