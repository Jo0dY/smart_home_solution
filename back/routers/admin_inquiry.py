from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from auth import get_current_user
import schemas, crud

router = APIRouter()

# ✅ 관리자 전체 문의글 조회
@router.get("/", response_model=list[schemas.Inquiry])
def get_all_inquiries(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user["role"] != "admin":
        raise HTTPException(status_code=403, detail="관리자만 접근 가능")
    return crud.get_all_inquiries(db)

# ✅ 관리자 답변 등록/수정/삭제
@router.patch("/{inquiry_id}/answer")
def answer_to_inquiry(
    inquiry_id: int,
    data: schemas.InquiryAnswer,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user["role"] != "admin":
        raise HTTPException(status_code=403, detail="관리자만 답변 가능")
    return crud.answer_inquiry(db, inquiry_id, data.answer)
