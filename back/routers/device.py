from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from schemas import DeviceCreate, DeviceOut
from models import Device
from auth import get_current_user  # ✅ JWT에서 사용자 정보 가져옴
from datetime import datetime

router = APIRouter(tags=["Devices"])

@router.post("/", response_model=DeviceOut)
def create_device(
    device: DeviceCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    # ✅ ip 누락 방지
    if not device.ip:
        raise HTTPException(status_code=400, detail="IP 주소가 필요합니다.")

    db_device = Device(
        name=device.name,
        type=device.type,
        ip=device.ip,
        user_id=current_user["user_id"],
        registered_at=datetime.utcnow()
    )
    db.add(db_device)
    db.commit()
    db.refresh(db_device)
    return db_device


@router.get("/", response_model=list[DeviceOut])
def get_devices(db: Session = Depends(get_db)):
    return db.query(Device).all()
