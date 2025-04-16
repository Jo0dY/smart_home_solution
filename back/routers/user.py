# ✅ routers/user.py
from fastapi import APIRouter, Depends, HTTPException, Body, Response, Request, Cookie
from sqlalchemy.orm import Session
from database import SessionLocal, get_db
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
from auth import (
    create_access_token, create_refresh_token, verify_refresh_token,
    get_current_user
)
from models import User
import random, smtplib, redis, os
from email.mime.text import MIMEText

router = APIRouter()
r = redis.Redis(host='localhost', port=6379, decode_responses=True)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/send-code")
def send_code(email: str = Body(..., embed=True)):
    email = email.lower()
    code = str(random.randint(100000, 999999))
    msg = MIMEText(f"지켜, 봄 인증코드: {code}")
    msg['Subject'] = "인증코드"
    msg['From'] = "jikyeobom.solution@gmail.com"
    msg['To'] = email
    try:
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login("jikyeobom.solution@gmail.com", "aqhnsvptbgavbxnr")
        server.sendmail(msg['From'], [msg['To']], msg.as_string())
        server.quit()
    except:
        raise HTTPException(status_code=500, detail="이메일 전송 실패")
    r.set(email, code, ex=300)
    return {"message": "전송 완료"}

@router.post("/verify-code")
def verify_code(email: str = Body(...), code: str = Body(...)):
    stored = r.get(email)
    if not stored or stored != code:
        raise HTTPException(status_code=400, detail="인증코드 오류")
    return {"message": "인증 성공"}

@router.post("/signup")
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    return create_user(db, user)

@router.post("/login")
def login_user(user: UserLogin, response: Response, db: Session = Depends(get_db)):
    user_in_db = authenticate_user(db, user.email, user.password)

    # ✅ 토큰 생성 (access + refresh)
    access_token = create_access_token(
        email=user_in_db.email,
        user_id=user_in_db.id,
        role=user_in_db.member_type
    )
    refresh_token = create_refresh_token({"email": user_in_db.email})

    # ✅ httpOnly 쿠키에 저장
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        max_age=60 * 60,
        samesite="lax",
        secure=False  # 배포 시 True
    )
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        max_age=60 * 60 * 24 * 7,
        samesite="lax",
        secure=False
    )
    return {
        "user_id": user_in_db.id,
        "email": user_in_db.email,
        "role": user_in_db.member_type
    }

@router.post("/refresh")
def refresh_access_token(response: Response, refresh_token: str = Cookie(None), db: Session = Depends(get_db)):
    if not refresh_token:
        raise HTTPException(status_code=401, detail="리프레시 토큰 누락")

    email = verify_refresh_token(refresh_token)
    if not email:
        raise HTTPException(status_code=401, detail="리프레시 토큰 유효하지 않음")

    # ✅ DB에서 사용자 정보 조회
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="사용자 없음")

    # ✅ 올바른 정보로 토큰 재발급
    new_access_token = create_access_token(
        email=user.email,
        user_id=user.id,
        role=user.member_type
    )

    response.set_cookie(
        key="access_token",
        value=new_access_token,
        httponly=True,
        max_age=60 * 60,
        samesite="lax",
        secure=False
    )
    return {"message": "access_token 갱신 완료"}

@router.post("/find-id")
def find_id(request: FindIDRequest, db: Session = Depends(get_db)):
    email = find_user_id(db, request.name, request.birth, request.email)
    return {"message": "아이디 찾기 완료", "email": email}

@router.post("/reset-password")
def reset_password(request: ResetPasswordRequest, db: Session = Depends(get_db)):
    user = check_reset_password_target(db, request.email)
    return {"message": f"{user.name} 확인됨"}

@router.put("/update-password")
def update_password(request: UpdatePasswordRequest, db: Session = Depends(get_db)):
    reset_user_password(db, request.email, request.new_password)
    return {"message": "비밀번호 변경 완료"}

@router.get("/me")
def get_me(request: Request, current_user=Depends(get_current_user)):
    print("📦 request.headers.cookie:", request.headers.get("cookie"))
    print("🍪 쿠키에서 access_token:", request.cookies.get("access_token"))
    return {
        "user_id": current_user["user_id"],
        "email": current_user["email"],
        "role": current_user["role"]
    }
