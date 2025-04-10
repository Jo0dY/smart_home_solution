from sqlalchemy.orm import Session
from models import User
from schemas import UserCreate
from fastapi import HTTPException
import bcrypt
from datetime import date

# 회원가입
def create_user(db: Session, user: UserCreate):
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="이미 등록된 이메일입니다.")

    hashed_pw = bcrypt.hashpw(user.password.encode(), bcrypt.gensalt())
    db_user = User(
        member_type=user.member_type,
        email=user.email,
        password=hashed_pw.decode(),
        name=user.name,
        phone=user.phone,
        carrier=user.carrier,
        birth=user.birth,
        under14=user.under14,
        company_name=user.company_name,
        business_number=user.business_number,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# 로그인
def authenticate_user(db: Session, email: str, password: str):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=400, detail="존재하지 않는 사용자입니다.")
    if not bcrypt.checkpw(password.encode(), user.password.encode()):
        raise HTTPException(status_code=400, detail="비밀번호가 일치하지 않습니다.")
    return user

# 아이디(이메일) 찾기
def find_user_id(db: Session, name: str, birth: date, email: str):
    user = db.query(User).filter(User.name == name, User.birth == birth, User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="해당 정보로 등록된 사용자가 없습니다.")
    return user.email

# 비밀번호 재설정 사용자 검증
def check_reset_password_target(db: Session, email: str):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="이메일로 등록된 사용자가 없습니다.")
    return user

# 비밀번호 재설정
def reset_user_password(db: Session, email: str, new_password: str):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="사용자를 찾을 수 없습니다.")
    hashed_pw = bcrypt.hashpw(new_password.encode(), bcrypt.gensalt()).decode()
    user.password = hashed_pw
    db.commit()
    return {"msg": "비밀번호가 성공적으로 재설정되었습니다."}
