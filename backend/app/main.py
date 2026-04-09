from fastapi import FastAPI
from app.db.database import engine, Base
from app.models import user, project, task
from app.api import auth,project, task
from fastapi.responses import JSONResponse
from fastapi import Request
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

#Craet table
Base.metadata.create_all(bind=engine)

app.include_router(auth.router)
app.include_router(project.router) 
app.include_router(task.router)

@app.get("/")
def root():
    return {"message": "API is running 🚀"}


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"message": "Internal Server Error. Please try again later."}
    )
    

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)