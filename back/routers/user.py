from fastapi import APIRouter, Depends, HTTPException, Body
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
    reset_user_password
)
import random
import smtplib
from email.mime.text import MIMEText
import redis
import os

router = APIRouter()

# ✅ Redis 연결
r = redis.Redis(host='localhost', port=6379, decode_responses=True)

# ✅ DB 세션
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ✅ 이메일 인증코드 발송 API
@router.post("/send-code")
def send_code(email: str = Body(..., embed=True)):
    email = email.lower()  # ✅ 대소문자 통일
    code = str(random.randint(100000, 999999))

    smtp_server = "smtp.gmail.com"
    smtp_port = 587
    sender_email = "jikyeobom.solution@gmail.com"       # ← 너의 Gmail 주소
    app_password = "aqhnsvptbgavbxnr"           # ← 앱 비밀번호 (띄어쓰기 없이)

    msg = MIMEText(f"지켜, 봄 보안 솔루션 이메일 인증코드: {code}")
    msg["Subject"] = "지켜, 봄 보안 솔루션 인증코드"
    msg["From"] = sender_email
    msg["To"] = email

    try:
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(sender_email, app_password)
        server.sendmail(sender_email, email, msg.as_string())
        server.quit()
    except Exception as e:
        print("이메일 전송 실패:", e)
        raise HTTPException(status_code=500, detail="이메일 발송 실패")

    r.set(email, code, ex=300)  # ✅ Redis에 인증코드 5분간 저장
    print(f"[Redis 저장] {email} : {code}")  # ✅ 확인 로그
    return {"message": "인증코드가 전송되었습니다."}


# ✅ 인증코드 검증 API
@router.post("/verify-code")
def verify_code(email: str = Body(...), code: str = Body(...)):
    email = email.lower()  # ✅ 대소문자 통일
    stored_code = r.get(email)
    print(f"[Redis 조회] {email} : {stored_code}")  # ✅ 확인 로그
    if stored_code is None:
        raise HTTPException(status_code=404, detail="인증코드가 만료되었거나 존재하지 않습니다.")
    if stored_code != code:
        raise HTTPException(status_code=400, detail="인증코드가 일치하지 않습니다.")
    
    return {"message": "인증 성공"}


# 나머지 회원가입/로그인/찾기/비밀번호 변경은 그대로
@router.post("/signup")
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    return create_user(db, user)

@router.post("/login", response_model=LoginResponse)
def login_user(user: UserLogin, db: Session = Depends(get_db)):
    user_in_db = authenticate_user(db, user.email, user.password)
    return {
        "access_token": "dummy_token",
        "user_id": user_in_db.id,
        "email": user_in_db.email
    }

@router.post("/find-id")
def find_id(request: FindIDRequest, db: Session = Depends(get_db)):
    email = find_user_id(db, request.name, request.birth, request.email)
    return {
        "message": "아이디(이메일)를 찾았습니다.",
        "email": email
    }

@router.post("/reset-password")
def reset_password(request: ResetPasswordRequest, db: Session = Depends(get_db)):
    user = check_reset_password_target(db, request.email)
    return {
        "message": f"{user.name}님의 계정이 확인되었습니다. 비밀번호 재설정 페이지로 이동해주세요."
    }

@router.put("/update-password")
def update_user_password(request: UpdatePasswordRequest, db: Session = Depends(get_db)):
    reset_user_password(db, request.email, request.new_password)
    return {
        "message": "비밀번호가 성공적으로 변경되었습니다. 다시 로그인해주세요."
    }