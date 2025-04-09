from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date

class UserCreate(BaseModel):
    member_type: str
    email: EmailStr
    password: str
    name: str
    phone: str
    birth: Optional[date] = None
    under14: Optional[bool] = None
    company_name: Optional[str] = None
    business_number: Optional[str] = None
