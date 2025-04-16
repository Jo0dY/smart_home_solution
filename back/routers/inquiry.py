# ✅ routers/inquiry.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from auth import get_current_user, get_current_user_optional
import schemas, crud
from models import User

router = APIRouter(tags=["문의하기"])

# ✅ 1. 문의글 작성 (회원만 가능)
@router.post("/inquiry", response_model=schemas.Inquiry)
def create_inquiry(
    inquiry: schemas.InquiryCreate,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    print("✅ current_user:", current_user)
    print("✅ inquiry 원본:", inquiry)

    inquiry_data = inquiry.dict()
    inquiry_data["user_id"] = current_user["user_id"]
    inquiry_data["email"] = current_user["email"]
    inquiry_data["name"] = current_user["email"]
    inquiry_data["is_member"] = True

    print("🧪 최종 inquiry_data:", inquiry_data)

    updated = schemas.InquiryCreate(**inquiry_data)
    return crud.create_inquiry(db, updated)

# ✅ 2. 내 문의글 목록
@router.get("/inquiry/me", response_model=list[schemas.Inquiry])
def get_my_inquiries(
    current_user=Depends(get_current_user),  # ✅ 수정된 부분
    db: Session = Depends(get_db)
):  
    print("🙋 current_user 객체 확인:", current_user)

    return crud.get_my_inquiries(db, current_user["user_id"])

# ✅ 3. 단일 문의글 조회 (본인 or 관리자)
@router.get("/inquiry/{inquiry_id}", response_model=schemas.Inquiry)
def read_inquiry(
    inquiry_id: int,
    current_user=Depends(get_current_user_optional),  # ✅ 수정된 부분
    db: Session = Depends(get_db)
):
    inquiry = crud.get_inquiry_by_id(db, inquiry_id)
    if not inquiry:
        raise HTTPException(status_code=404, detail="문의글이 존재하지 않습니다.")

    if current_user is None:
        raise HTTPException(status_code=401, detail="로그인이 필요합니다.")

    if current_user["role"] != "admin" and inquiry.user_id != current_user["user_id"]:
        raise HTTPException(status_code=403, detail="접근 권한이 없습니다.")

    return inquiry

# ✅ 4. 문의글 수정
@router.put("/inquiry/{inquiry_id}", response_model=schemas.Inquiry)
def update_inquiry(
    inquiry_id: int,
    updated: schemas.InquiryCreate,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    inquiry = crud.get_inquiry_by_id(db, inquiry_id)
    if not inquiry or inquiry.user_id != current_user["user_id"]:
        raise HTTPException(status_code=403, detail="수정 권한이 없습니다.")

    return crud.update_inquiry(db, inquiry_id, updated)

# ✅ 5. 문의글 삭제
@router.delete("/inquiry/{inquiry_id}")
def delete_inquiry(
    inquiry_id: int,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    inquiry = crud.get_inquiry_by_id(db, inquiry_id)
    if not inquiry or inquiry.user_id != current_user["user_id"]:
        raise HTTPException(status_code=403, detail="삭제 권한이 없습니다.")

    return crud.delete_inquiry(db, inquiry_id)

# ✅ 6. 관리자 - 전체 목록
@router.get("/inquiry/all", response_model=list[schemas.Inquiry])
def read_all_inquiries_admin(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user["role"] != "admin":
        raise HTTPException(status_code=403, detail="관리자만 접근 가능합니다.")
    return crud.get_all_inquiries(db)

# ✅ 7. 관리자 - 답변 작성
@router.patch("/inquiry/{inquiry_id}/answer", response_model=schemas.Inquiry)
def answer_to_inquiry(
    inquiry_id: int,
    data: schemas.InquiryAnswer,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user["role"] != "admin":
        raise HTTPException(status_code=403, detail="관리자만 답변할 수 있습니다.")
    return crud.answer_inquiry(db, inquiry_id, data.answer)