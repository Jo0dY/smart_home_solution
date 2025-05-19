from pydantic import BaseModel, EmailStr, ConfigDict, constr, IPvAnyAddress
from typing import Optional, List
from datetime import date, datetime

# -------------------- 🔐 사용자 인증 관련 --------------------

class UserCreate(BaseModel):
    member_type: str
    email: EmailStr
    password: str
    name: str
    phone: str
    carrier: Optional[str] = None
    birth: Optional[date] = None
    under14: Optional[bool] = None
    company_name: Optional[str] = None
    business_number: Optional[str] = None
    parent_verified: Optional[bool] = False


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class LoginResponse(BaseModel):
    access_token: str
    user_id: int
    email: EmailStr
    role: str


# -------------------- 📧 이메일 인증 / 비밀번호 --------------------

class FindIDRequest(BaseModel):
    name: str
    birth: date
    email: EmailStr


class ResetPasswordRequest(BaseModel):
    email: EmailStr
    code: str


class UpdatePasswordRequest(BaseModel):
    email: EmailStr
    new_password: str


# -------------------- 📢 공지사항 --------------------

class NoticeCreate(BaseModel):
    title: str
    content: str


class NoticeUpdate(BaseModel):
    title: str
    content: str


class NoticeOut(BaseModel):
    id: int
    title: str
    content: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


# -------------------- 🛠️ 관리자 로그 --------------------

class AdminLogCreate(BaseModel):
    action: str
    target_type: Optional[str]
    target_id: Optional[int]


# -------------------- 📬 문의글 --------------------

class InquiryCreate(BaseModel):
    title: str
    content: str
    is_secret: Optional[bool] = False
    password: Optional[str] = None
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    is_member: Optional[bool] = None
    user_id: Optional[int] = None


class Inquiry(BaseModel):
    id: int
    name: str
    email: EmailStr
    title: str
    content: str
    is_secret: bool
    is_member: bool
    user_id: Optional[int]
    password: Optional[str] = None
    created_at: datetime
    status: str
    answer: Optional[str]

    model_config = ConfigDict(from_attributes=True)


class InquiryAnswer(BaseModel):
    answer: str


# -------------------- 📱 IoT 기기 등록 --------------------

class DeviceCreate(BaseModel):
    name: constr(min_length=1, max_length=50)
    type: constr(min_length=1, max_length=30)
    ip: IPvAnyAddress
    ssid: constr(min_length=1, max_length=32)
    password: constr(min_length=8, max_length=64)

class DeviceOut(BaseModel):
    id: int
    user_id: int
    name: str
    type: str
    ip: str
    registered_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)


