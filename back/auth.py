from fastapi import Depends, HTTPException, Request,status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session
from database import get_db
from models import User
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv

load_dotenv()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/v1/users/login")


# ✅ 환경 변수 로드
SECRET_KEY = os.getenv("SECRET_KEY")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 60))
REFRESH_TOKEN_EXPIRE_DAYS = 7
ALGORITHM = "HS256"

# ✅ access_token 생성
def create_access_token(email: str, user_id: int, role: str) -> str:
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    payload = {
        "sub": str(email),            # ✅ 문자열로 변환
        "exp": expire,
        "user_id": user_id,
        "role": role
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

# ✅ refresh_token 생성
def create_refresh_token(email: str) -> str:
    expire = datetime.utcnow() + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    payload = {
        "sub": str(email),            # ✅ 반드시 문자열
        "exp": expire
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

# ✅ refresh_token 검증
def verify_refresh_token(token: str) -> str | None:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload.get("sub")
    except JWTError:
        return None

# ✅ 필수 인증 - 로그인 유저만 접근 가능
def get_current_user(request: Request, db: Session = Depends(get_db)) -> dict:
    token = request.cookies.get("access_token")
    print("✅ 쿠키에서 access_token:", token)

    if not token:
        raise HTTPException(status_code=401, detail="인증이 필요합니다.")
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        user_id = payload.get("user_id")
        role = payload.get("role")

        if not email or not user_id:
            raise HTTPException(status_code=401, detail="토큰 정보 부족")

        return {
            "email": email,
            "user_id": user_id,
            "role": role
        }
    except JWTError as e:
        print("❌ JWT 오류:", str(e))
        raise HTTPException(status_code=401, detail="유효하지 않은 토큰입니다.")

# ✅ 선택적 인증 - 비회원 접근 허용
def get_current_user_optional(request: Request, db: Session = Depends(get_db)) -> dict | None:
    token = request.cookies.get("access_token")
    if not token:
        return None
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        user_id = payload.get("user_id")
        role = payload.get("role")

        if not email or not user_id:
            return None

        return {
            "email": email,
            "user_id": user_id,
            "role": role
        }
    except JWTError:
        return None
