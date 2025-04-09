from sqlalchemy import Column, Integer, String, Date, Boolean
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    name = Column(String(100), nullable=False)
    phone = Column(String(20), nullable=False)
    member_type = Column(String(20), nullable=False)  # ✅ user_type ➜ member_type로 변경
    birth = Column(Date)
    under14 = Column(Boolean)
    company_name = Column(String(255))
    business_number = Column(String(50))  # ✅ 이 필드가 꼭 있어야 함
