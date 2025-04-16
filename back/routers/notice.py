from fastapi import APIRouter, Depends, HTTPException, Request, Response, Cookie
from sqlalchemy.orm import Session
from database import get_db
from models import Notice
from schemas import NoticeCreate, NoticeOut, NoticeUpdate
from datetime import datetime
from auth import get_current_user
from crud import log_admin_action  # ✅ 관리자 로그 기록용 함수

router = APIRouter()

# ✅ 공지사항 작성 (관리자만 가능)
@router.post("/", response_model=NoticeOut)
def create_notice(
    notice: NoticeCreate,
    request: Request,
    response: Response,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    if current_user.member_type != "admin":
        raise HTTPException(status_code=403, detail="관리자만 작성 가능")
    
    new_notice = Notice(
        title=notice.title,
        content=notice.content,
        created_at=datetime.utcnow()
    )
    db.add(new_notice)
    db.commit()
    db.refresh(new_notice)

    # ✅ 관리자 로그 기록
    log_admin_action(
        db,
        admin_id=current_user.id,
        action="create",
        target_type="notice",
        target_id=new_notice.id
    )

    return new_notice


# ✅ 공지사항 목록 조회 (모두 가능)
@router.get("/", response_model=list[NoticeOut])
def list_notice(db: Session = Depends(get_db)):
    return db.query(Notice).order_by(Notice.created_at.desc()).all()


# ✅ 공지사항 상세 조회
@router.get("/{notice_id}", response_model=NoticeOut)
def get_notice(notice_id: int, db: Session = Depends(get_db)):
    notice = db.query(Notice).filter(Notice.id == notice_id).first()
    if not notice:
        raise HTTPException(status_code=404, detail="공지사항을 찾을 수 없습니다.")
    return notice


# ✅ 공지사항 수정 (관리자만 가능)
@router.put("/{notice_id}")
def update_notice(
    notice_id: int,
    data: NoticeUpdate,
    request: Request,
    response: Response,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    if current_user.member_type != "admin":
        raise HTTPException(status_code=403, detail="수정 권한 없음")

    notice = db.query(Notice).filter(Notice.id == notice_id).first()
    if not notice:
        raise HTTPException(status_code=404, detail="공지 없음")

    notice.title = data.title
    notice.content = data.content
    db.commit()

    # ✅ 관리자 로그 기록
    log_admin_action(
        db,
        admin_id=current_user.id,
        action="update",
        target_type="notice",
        target_id=notice_id
    )

    return {"message": "수정 완료"}


# ✅ 공지사항 삭제 (관리자만 가능)
@router.delete("/{notice_id}")
def delete_notice(
    notice_id: int,
    request: Request,
    response: Response,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    if current_user.member_type != "admin":
        raise HTTPException(status_code=403, detail="삭제 권한 없음")

    notice = db.query(Notice).filter(Notice.id == notice_id).first()
    if not notice:
        raise HTTPException(status_code=404, detail="공지 없음")

    db.delete(notice)
    db.commit()

    # ✅ 관리자 로그 기록
    log_admin_action(
        db,
        admin_id=current_user.id,
        action="delete",
        target_type="notice",
        target_id=notice_id
    )

    return {"message": "삭제 완료"}
