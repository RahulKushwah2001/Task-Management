from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.user import UserCreate, UserLogin
from app.services.user_service import create_user, authenticate_user
from app.core.security import create_access_token
from app.db.deps import get_db

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    new_user = create_user(db, user.email, user.password)

    if not new_user:
        raise HTTPException(status_code=400, detail="User already exists")

    return {"message": "User created successfully"}


@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = authenticate_user(db, user.email, user.password)

    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": db_user.email})

    return {"access_token": token, "token_type": "bearer"}