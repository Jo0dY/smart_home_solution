from sqlalchemy.orm import Session
from models import User
from schemas import UserCreate
from fastapi import HTTPException
import hashlib

def create_user(db: Session, user: UserCreate):
    # ✅ [1] 이메일 중복 체크
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="이미 등록된 이메일입니다.")

    # ✅ [2] 비밀번호 해시 처리
    hashed_pw = hashlib.sha256(user.password.encode()).hexdigest()

    # ✅ [3] 새 사용자 생성
    db_user = User(
        member_type=user.member_type,
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
