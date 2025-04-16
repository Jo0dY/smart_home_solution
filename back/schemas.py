from pydantic import BaseModel, EmailStr, ConfigDict
from typing import Optional
from datetime import date, datetime

# ✅ 회원가입 요청 스키마
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

# ✅ 로그인 요청 스키마
class UserLogin(BaseModel):
    email: EmailStr
    password: str

# ✅ 로그인 응답 스키마
class LoginResponse(BaseModel):
    access_token: str
    user_id: int
    email: EmailStr
    role: str

# ✅ 아이디(이메일) 찾기 요청
class FindIDRequest(BaseModel):
    name: str
    birth: date
    email: EmailStr

# ✅ 비밀번호 재설정 전 사용자 확인용
class ResetPasswordRequest(BaseModel):
    email: EmailStr
    code: str  # 이메일 인증 코드

# ✅ 비밀번호 재설정 요청
class UpdatePasswordRequest(BaseModel):
    email: EmailStr
    new_password: str

# ✅ 공지사항 작성 요청
class NoticeCreate(BaseModel):
    title: str
    content: str

# ✅ 공지사항 수정 요청
class NoticeUpdate(BaseModel):
    title: str
    content: str

# ✅ 공지사항 응답 스키마
class NoticeOut(BaseModel):
    id: int
    title: str
    content: str
    created_at: datetime

    class Config:
        from_attributes = True

# ✅ 관리자 로그 기록 요청용
class AdminLogCreate(BaseModel):
    action: str
    target_type: Optional[str]
    target_id: Optional[int]

# ✅ 문의글 작성 요청
class InquiryCreate(BaseModel):
    title: str
    content: str
    is_secret: Optional[bool] = False
    password: Optional[str] = None
    # 아래는 백엔드 내부에서 처리
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    is_member: Optional[bool] = None
    user_id: Optional[int] = None


# ✅ 문의글 조회 응답용
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

# ✅ 문의 답변용 스키마 (관리자 작성)
class InquiryAnswer(BaseModel):
    answer: str
