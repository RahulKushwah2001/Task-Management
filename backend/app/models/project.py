from sqlalchemy import Column, Integer, String, ForeignKey
from app.db.database import Base
from pydantic import BaseModel, Field

class ProjectCreate(BaseModel):
    title: str = Field(..., min_length=3)
    description: str
    status: str = Field(..., pattern="^(active|completed)$")
    
class ProjectUpdate(BaseModel):
    title: str = Field(..., min_length=3)
    description: str
    status: str = Field(..., pattern="^(active|completed)$")

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String)
    status = Column(String, default="active")
    user_id = Column(Integer, ForeignKey("users.id"))