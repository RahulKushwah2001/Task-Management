from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.models.task import TaskCreate, TaskUpdate
from app.services.task_service import (
    create_task,
    get_tasks,
    get_task_by_id,
    update_task,
    delete_task
)

from app.db.deps import get_db
from app.core.dependencies import get_current_user

router = APIRouter(prefix="/tasks", tags=["Tasks"])


#  CREATE TASK
@router.post("/")
def create(
    data: TaskCreate,
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    task = create_task(db, data, user.id)

    if not task:
        raise HTTPException(status_code=404, detail="Project not found or you don't have access")

    return task


#  GET TASKS (WITH FILTER)
@router.get("/")
def read_all(
    project_id: int,
    status: str = Query(None, pattern="^(todo|in-progress|done)$"),
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    tasks = get_tasks(db, project_id, user.id, status)

    if not tasks:
        return {"message": "No tasks found"}

    return tasks


#  UPDATE TASK
@router.put("/{task_id}")
def update(
    task_id: int,
    data: TaskUpdate,
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    task = get_task_by_id(db, task_id, user.id)

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    return update_task(db, task, data)


#  DELETE TASK
@router.delete("/{task_id}")
def delete(
    task_id: int,
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    task = get_task_by_id(db, task_id, user.id)

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    delete_task(db, task)

    return {"message": "Task deleted successfully"}