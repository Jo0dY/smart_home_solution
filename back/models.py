from sqlalchemy import Column, Integer, String, Boolean, Date, Text, DateTime, ForeignKey
from database import Base
from datetime import datetime

# ✅ 사용자(User) 테이블 정의
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    member_type = Column(String(20), nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    password = Column(String(256), nullable=False)
    name = Column(String(50), nullable=False)
    phone = Column(String(20), nullable=False)
    carrier = Column(String(30), nullable=True)
    birth = Column(Date, nullable=True)
    under14 = Column(Boolean, default=False)
    company_name = Column(String(100), nullable=True)
    business_number = Column(String(30), nullable=True)
    parent_verified = Column(Boolean, default=False)


# ✅ 기기(Device) 테이블 정의
class Device(Base):
    __tablename__ = "devices"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    name = Column(String(100), nullable=False)
    type = Column(String(50), nullable=False)
    ip = Column(String(100), nullable=False)
    registered_at = Column(DateTime, default=datetime.utcnow)


# ✅ 스캔 결과(ScanResult) 테이블 정의
class ScanResult(Base):
    __tablename__ = "scan_results"

    id = Column(Integer, primary_key=True, index=True)
    device_id = Column(Integer, ForeignKey("devices.id"), nullable=False)
    scan_date = Column(DateTime, default=datetime.utcnow)
    vulnerabilities = Column(Text, nullable=False)
    vulnerability_count = Column(Integer, default=0)
    score = Column(Integer, default=0)  # ✅ 보안 점수 필드 추가됨!
    result_summary = Column(Text, nullable=True)


# ✅ 공지사항 테이블
class Notice(Base):
    __tablename__ = "notices"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)


# ✅ 문의사항 테이블
class Inquiry(Base):
    __tablename__ = "inquiries"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False)
    title = Column(String(200), nullable=False)
    content = Column(Text, nullable=False)
    is_member = Column(Boolean, default=True)
    user_id = Column(Integer, nullable=False)
    is_secret = Column(Boolean, default=False)
    password = Column(String(100), nullable=True)
    status = Column(String(20), default="대기중")
    answer = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)


# ✅ 관리자 로그 테이블
class AdminLog(Base):
    __tablename__ = "admin_logs"

    id = Column(Integer, primary_key=True, index=True)
    admin_id = Column(Integer, nullable=False)
    action = Column(String(100), nullable=False)
    target_type = Column(String(50))
    target_id = Column(Integer, nullable=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
