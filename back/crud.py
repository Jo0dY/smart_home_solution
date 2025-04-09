from sqlalchemy.orm import Session
from models import User
from schemas import UserCreate
import hashlib

def create_user(db: Session, user: UserCreate):
    hashed_pw = hashlib.sha256(user.password.encode()).hexdigest()
    db_user = User(
        member_type=user.member_type,   # ✅ 수정된 부분!
        email=user.email,
        password=hashed_pw,
        name=user.name,
        phone=user.phone,
        birth=user.birth,
        under14=user.under14,
        company_name=user.company_name,
        business_number=user.business_number,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
