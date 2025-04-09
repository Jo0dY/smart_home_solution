from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from schemas import UserCreate
from crud import create_user

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/signup")
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    return create_user(db, user)
