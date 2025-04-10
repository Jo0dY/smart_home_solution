from sqlalchemy import Column, Integer, String, Boolean, Date
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    member_type = Column(String(20), nullable=False)  # ✅ 필수 항목은 nullable=False로 명시
    email = Column(String(100), unique=True, index=True, nullable=False)
    password = Column(String(256), nullable=False)
    name = Column(String(50), nullable=False)
    phone = Column(String(20), nullable=False)
    carrier = Column(String(30), nullable=True)  # ✅ 알뜰폰(SKT) 등 문자열 길이 여유
    birth = Column(Date, nullable=True)
    under14 = Column(Boolean, default=False)
    company_name = Column(String(100), nullable=True)
    business_number = Column(String(30), nullable=True)
