from sqlalchemy import Column, Integer, String, ForeignKey, Date
from app.db.database import Base
from typing import Optional
from pydantic import BaseModel, Field
from datetime import date

class TaskCreate(BaseModel):
    title: str = Field(..., min_length=3)
    description: Optional[str] = None
    status: str = Field(..., pattern="^(todo|in-progress|done)$")
    due_date: Optional[date] = None
    project_id: int


class TaskUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=3)
    description: Optional[str] = None
    status: Optional[str] = None
    due_date: Optional[date] = None

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String)
    status = Column(String, default="todo")
    due_date = Column(String, nullable=True)
    project_id = Column(Integer, ForeignKey("projects.id"))