from sqlalchemy.orm import Session
from app.models.task import Task
from app.models.project import Project


#  Create Task
def create_task(db: Session, data, user_id: int):
    # Check project ownership
    project = db.query(Project).filter(
        Project.id == data.project_id,
        Project.user_id == user_id
    ).first()

    if not project:
        return None

    task = Task(
        title=data.title,
        description=data.description,
        status=data.status,
        due_date=data.due_date,
        project_id=data.project_id
    )

    db.add(task)
    db.commit()
    db.refresh(task)

    return task


#  Get Tasks (with filter)
def get_tasks(db: Session, project_id: int, user_id: int, status: str = None):
    query = db.query(Task).join(Project).filter(
        Project.id == project_id,
        Project.user_id == user_id
    )

    if status:
        query = query.filter(Task.status == status)

    return query.all()


#  Get Single Task
def get_task_by_id(db: Session, task_id: int, user_id: int):
    return db.query(Task).join(Project).filter(
        Task.id == task_id,
        Project.user_id == user_id
    ).first()


#  Update Task
def update_task(db: Session, task: Task, data):
    if data.title is not None:
        task.title = data.title

    if data.description is not None:
        task.description = data.description

    if data.status is not None:
        task.status = data.status

    if data.due_date is not None:
        task.due_date = data.due_date

    db.commit()
    db.refresh(task)

    return task


#  Delete Task
def delete_task(db: Session, task: Task):
    db.delete(task)
    db.commit()