# ✅ models.py (보안 보완 포함 최종 버전)
from sqlalchemy import Column, Integer, String, Boolean, Date, Text, DateTime
from database import Base
from datetime import datetime

# ✅ 사용자(User) 테이블
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    member_type = Column(String(20), nullable=False)  # personal 또는 company
    email = Column(String(100), unique=True, index=True, nullable=False)
    password = Column(String(256), nullable=False)
    name = Column(String(50), nullable=False)
    phone = Column(String(20), nullable=False)
    carrier = Column(String(30), nullable=True)  # 예: SKT, KT 등
    birth = Column(Date, nullable=True)
    under14 = Column(Boolean, default=False)
    company_name = Column(String(100), nullable=True)
    business_number = Column(String(30), nullable=True)

# ✅ 공지사항(Notice) 테이블
class Notice(Base):
    __tablename__ = "notices"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

# ✅ 관리자 로그(AdminLog) 테이블
class AdminLog(Base):
    __tablename__ = "admin_logs"

    id = Column(Integer, primary_key=True, index=True)
    admin_id = Column(Integer, nullable=False)              # 관리자 ID
    action = Column(String(100), nullable=False)            # 예: "삭제", "수정"
    target_type = Column(String(50))                        # 예: "notice"
    target_id = Column(Integer, nullable=True)              # 예: 삭제한 notice ID
    timestamp = Column(DateTime, default=datetime.utcnow)   # 작업 시각

# ✅ 문의사항(Inquiry) 테이블
class Inquiry(Base):
    __tablename__ = "inquiries"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False)
    title = Column(String(200), nullable=False)
    content = Column(Text, nullable=False)
    is_member = Column(Boolean, default=True)               # 기본값 True로 수정 (비회원 제거)
    user_id = Column(Integer, nullable=False)               # 회원제 시스템이므로 필수화
    is_secret = Column(Boolean, default=False)              # 비밀글은 현재 사용 안 함
    password = Column(String(100), nullable=True)           # ❌ 사용하지 않음 (남겨두되 제거 예정)
    status = Column(String(20), default="대기중")            # 상태: 대기중, 답변완료
    answer = Column(Text, nullable=True)                    # 관리자 답변
    created_at = Column(DateTime, default=datetime.utcnow)