from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine
from routers import user, notice, inquiry
from dotenv import load_dotenv
from routers import admin_inquiry  # 새로 추가
import os

# ✅ 환경변수 로딩
load_dotenv()

# ✅ 개발환경에서만 DB 테이블 자동 생성
if os.getenv("ENV") == "development":
    Base.metadata.create_all(bind=engine)

# ✅ FastAPI 앱 정의
app = FastAPI(
    title="Smart Home Security API",
    description="스마트홈 보안 솔루션 API 문서",
    version="1.0.0",
    docs_url="/docs" if os.getenv("ENV") == "development" else None,
    redoc_url=None
)

# ✅ 핵심!! 환경 쿠키 신뢰하도록 설정
app.trust_env = True  # 🔥 이거 안 넣으면 쿠키 못 읽음

# ✅ CORS 허용 origin 목록 정의
frontend_urls = [
   # "http://localhost:5173",  # Electron (Vite)
    "http://localhost:3000",  # 일반 웹 브라우저
]

print(f"✅ [CORS 허용 Origin]: {frontend_urls}")

# ✅ CORS 미들웨어 등록
app.add_middleware(
    CORSMiddleware,
    allow_origins=frontend_urls,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ 라우터 등록
app.include_router(user.router, prefix="/api/v1/users", tags=["User"])
app.include_router(notice.router, prefix="/api/v1/notice", tags=["Notice"])
app.include_router(inquiry.router, prefix="/api/v1", tags=["문의하기"])
app.include_router(admin_inquiry.router, prefix="/api/v1/admin/inquiry")
