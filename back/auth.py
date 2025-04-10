### ✅ auth.py (JWT 발급 모듈)
from jose import JWTError, jwt
from datetime import datetime, timedelta

SECRET_KEY = "your_secret_key_here"  # 배포 시에는 환경변수 사용 권장
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt