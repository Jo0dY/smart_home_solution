from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from schemas import (
    UserCreate, UserLogin, LoginResponse,
    FindIDRequest, ResetPasswordRequest, UpdatePasswordRequest
)
from crud import (
    create_user,
    authenticate_user,
    find_user_id,
    check_reset_password_target,
    reset_user_password  # ✅ 함수명 통일
)

router = APIRouter()


# ✅ DB 세션 의존성 주입
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ✅ 회원가입
@router.post("/signup")
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    return create_user(db, user)


# ✅ 로그인
@router.post("/login", response_model=LoginResponse)
def login_user(user: UserLogin, db: Session = Depends(get_db)):
    user_in_db = authenticate_user(db, user.email, user.password)

    # ✅ LoginResponse 스키마에 맞게 응답 가공
    return {
        "access_token": "dummy_token",  # JWT 적용 전엔 일단 문자열 반환
        "user_id": user_in_db.id,
        "email": user_in_db.email
    }


# ✅ 아이디(이메일) 찾기
@router.post("/find-id")
def find_id(request: FindIDRequest, db: Session = Depends(get_db)):
    email = find_user_id(db, request.name, request.birth, request.email)
    return {
        "message": "아이디(이메일)를 찾았습니다.",
        "email": email
    }


# ✅ 비밀번호 재설정 대상 사용자 확인
@router.post("/reset-password")
def reset_password(request: ResetPasswordRequest, db: Session = Depends(get_db)):
    user = check_reset_password_target(db, request.email)
    return {
        "message": f"{user.name}님의 계정이 확인되었습니다. 비밀번호 재설정 페이지로 이동해주세요."
    }


# ✅ 실제 비밀번호 변경
@router.put("/update-password")
def update_user_password(request: UpdatePasswordRequest, db: Session = Depends(get_db)):
    reset_user_password(db, request.email, request.new_password)
    return {
        "message": "비밀번호가 성공적으로 변경되었습니다. 다시 로그인해주세요."
    }
