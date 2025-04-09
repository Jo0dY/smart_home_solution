from fastapi import FastAPI
from routers import user
from database import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(user.router, prefix="/users", tags=["회원가입"])
