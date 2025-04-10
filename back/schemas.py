from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date

# ✅ 회원가입 요청용 스키마
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

# ✅ 로그인 요청용 스키마
class UserLogin(BaseModel):
    email: EmailStr
    password: str

# ✅ 로그인 응답용 스키마 (토큰 발급 시)
class LoginResponse(BaseModel):
    access_token: str
    user_id: int
    email: EmailStr

# ✅ 아이디 찾기 요청용
class FindIDRequest(BaseModel):
    name: str
    birth: date
    email: EmailStr

# ✅ 비밀번호 재설정 전 사용자 확인용
class ResetPasswordRequest(BaseModel):
    email: EmailStr
    code: str  # 이메일 인증 코드 (현재는 단순 텍스트 기준)

# ✅ 실제 비밀번호 변경 요청
class UpdatePasswordRequest(BaseModel):
    email: EmailStr
    new_password: str
