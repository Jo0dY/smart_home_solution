from fastapi import FastAPI
from routers import user
from database import Base, engine
from fastapi.middleware.cors import CORSMiddleware

# 데이터베이스 테이블 생성
Base.metadata.create_all(bind=engine)

app = FastAPI()  # ✅ 딱 한 번만!

# ✅ CORS 미들웨어 (전체 허용 - 테스트용)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 배포 시에는 도메인 지정
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ 사용자 관련 라우터 등록
app.include_router(user.router, prefix="/users", tags=["User"])