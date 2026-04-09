from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.project import ProjectCreate, ProjectUpdate
from app.services.user_service import (
    create_project,
    get_projects,
    get_project_by_id,
    update_project,
    delete_project
)

from app.db.deps import get_db
from app.core.dependencies import get_current_user

router = APIRouter(prefix="/projects", tags=["Projects"])


# CREATE PROJECT
@router.post("/")
def create(
    data: ProjectCreate,
    db: Session = Depends(get_db),
    user = Depends(get_current_user)   
):
    project = create_project(
        db,
        data.title,
        data.description,
        data.status,
        user.id   
    )

    return project


#  GET ALL PROJECTS
@router.get("/")
def read_all(
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    return get_projects(db, user.id)


#  UPDATE PROJECT
@router.put("/{project_id}")
def update(
    project_id: int,
    data: ProjectUpdate,
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    project = get_project_by_id(db, project_id, user.id)

    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    return update_project(db, project, data)


#  DELETE PROJECT
@router.delete("/{project_id}")
def delete(
    project_id: int,
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    project = get_project_by_id(db, project_id, user.id)

    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    delete_project(db, project)

    return {"message": "Deleted successfully"}