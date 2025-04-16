# ✅ crud.py (수정된 전체 코드)
from sqlalchemy.orm import Session
from models import User, Inquiry, AdminLog
from schemas import UserCreate, InquiryCreate, LoginResponse, Inquiry as InquiryOut
from fastapi import HTTPException
from typing import Optional
from datetime import date
import bcrypt

# ✅ 회원가입
def create_user(db: Session, user: UserCreate) -> LoginResponse:
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

    return LoginResponse.model_validate(db_user, from_attributes=True)

# ✅ 로그인
def authenticate_user(db: Session, email: str, password: str) -> User:
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=400, detail="존재하지 않는 사용자입니다.")
    if not bcrypt.checkpw(password.encode(), user.password.encode()):
        raise HTTPException(status_code=400, detail="비밀번호가 일치하지 않습니다.")
    return user

# ✅ 아이디(이메일) 찾기
def find_user_id(db: Session, name: str, birth: date, email: str) -> str:
    user = db.query(User).filter(User.name == name, User.birth == birth, User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="해당 정보로 등록된 사용자가 없습니다.")
    return user.email

# ✅ 비밀번호 재설정 사용자 검증
def check_reset_password_target(db: Session, email: str) -> User:
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="이메일로 등록된 사용자가 없습니다.")
    return user

# ✅ 비밀번호 재설정
def reset_user_password(db: Session, email: str, new_password: str):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="사용자를 찾을 수 없습니다.")
    hashed_pw = bcrypt.hashpw(new_password.encode(), bcrypt.gensalt()).decode()
    user.password = hashed_pw
    db.commit()
    return {"msg": "비밀번호가 성공적으로 재설정되었습니다."}

# ✅ 관리자 로그 기록
def log_admin_action(
    db: Session,
    admin_id: int,
    action: str,
    target_type: str,
    target_id: Optional[int] = None
):
    log = AdminLog(
        admin_id=admin_id,
        action=action,
        target_type=target_type,
        target_id=target_id,
    )
    db.add(log)
    db.commit()

# ✅ 문의글 작성 (회원만)
def create_inquiry(db: Session, inquiry: InquiryCreate) -> InquiryOut:
    db_inquiry = Inquiry(
        name=inquiry.name,
        email=inquiry.email,
        title=inquiry.title,
        content=inquiry.content,
        is_member=True,
        user_id=inquiry.user_id,
        is_secret=False,
        password=None,
        status="대기중",
        answer=None
    )
    db.add(db_inquiry)
    db.commit()
    db.refresh(db_inquiry)
    return InquiryOut.model_validate(db_inquiry, from_attributes=True)

# ✅ 내 문의글 목록 (비회원 제거)
def get_my_inquiries(db: Session, user_id: int) -> list[InquiryOut]:
    inquiries = (
        db.query(Inquiry)
        .filter(Inquiry.user_id == user_id, Inquiry.is_member == True)  # ✅ 회원만
        .order_by(Inquiry.created_at.desc())
        .all()
    )
    return [InquiryOut.model_validate(i, from_attributes=True) for i in inquiries]

# ✅ 전체 문의글 목록 (관리자용)
def get_all_inquiries(db: Session) -> list[InquiryOut]:
    inquiries = db.query(Inquiry).order_by(Inquiry.created_at.desc()).all()
    return [InquiryOut.model_validate(i, from_attributes=True) for i in inquiries]

# ✅ 단일 문의글 조회
def get_inquiry_by_id(db: Session, inquiry_id: int) -> Inquiry:
    inquiry = db.query(Inquiry).filter(Inquiry.id == inquiry_id).first()
    if not inquiry:
        raise HTTPException(status_code=404, detail="문의글이 존재하지 않습니다.")
    return inquiry

# ✅ 문의글 수정
def update_inquiry(db: Session, inquiry_id: int, new_data: InquiryCreate) -> InquiryOut:
    inquiry = db.query(Inquiry).filter(Inquiry.id == inquiry_id).first()
    if not inquiry:
        raise HTTPException(status_code=404, detail="문의글이 존재하지 않습니다.")
    inquiry.title = new_data.title
    inquiry.content = new_data.content
    db.commit()
    db.refresh(inquiry)
    return InquiryOut.model_validate(inquiry, from_attributes=True)

# ✅ 문의글 삭제
def delete_inquiry(db: Session, inquiry_id: int):
    inquiry = db.query(Inquiry).filter(Inquiry.id == inquiry_id).first()
    if not inquiry:
        raise HTTPException(status_code=404, detail="문의글이 존재하지 않습니다.")
    db.delete(inquiry)
    db.commit()
    return {"message": "삭제 완료"}

# ✅ 관리자 답변 등록
def answer_inquiry(db: Session, inquiry_id: int, answer_text: str) -> InquiryOut:
    inquiry = db.query(Inquiry).filter(Inquiry.id == inquiry_id).first()
    if not inquiry:
        raise HTTPException(status_code=404, detail="문의글이 존재하지 않습니다.")
    
    inquiry.answer = answer_text
    inquiry.status = "답변완료" if answer_text.strip() else "대기중"

    db.commit()
    db.refresh(inquiry)
    return InquiryOut.model_validate(inquiry, from_attributes=True)
