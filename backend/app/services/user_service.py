from sqlalchemy.orm import Session
from app.models.user import User
from app.models.project import Project
from app.core.security import hash_password, verify_password

def create_user(db: Session, email: str, password: str):
    # check if user exists
    existing_user = db.query(User).filter(User.email == email).first()
    if existing_user:
        return None

    # hash password
    hashed_password = hash_password(password)

    # create user
    user = User(email=email, password=hashed_password)

    db.add(user)
    db.commit()
    db.refresh(user)

    return user


def authenticate_user(db: Session, email: str, password: str):
    user = db.query(User).filter(User.email == email).first()

    if not user:
        return None

    if not verify_password(password, user.password):
        return None

    return user


def create_project(db: Session, title: str, description: str, status: str, user_id: int):
    project = Project(
        title=title,
        description=description,
        status=status,
        user_id=user_id
    )

    db.add(project)
    db.commit()
    db.refresh(project)

    return project


def get_projects(db: Session, user_id: int):
    return db.query(Project).filter(Project.user_id == user_id).all()


def get_project_by_id(db: Session, project_id: int, user_id: int):
    return db.query(Project).filter(
        Project.id == project_id,
        Project.user_id == user_id
    ).first()


def update_project(db: Session, project: Project, data):
    project.title = data.title
    project.description = data.description
    project.status = data.status

    db.commit()
    db.refresh(project)

    return project


def delete_project(db: Session, project: Project):
    db.delete(project)
    db.commit()