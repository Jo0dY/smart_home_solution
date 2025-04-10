from fastapi import FastAPI
from routers import user
from database import Base, engine
from fastapi.middleware.cors import CORSMiddleware

# 데이터베이스 테이블 생성
Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React 프론트 주소 (배포 시 도메인으로 변경)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 사용자 관련 라우터 등록
app.include_router(user.router, prefix="/users", tags=["User"])
