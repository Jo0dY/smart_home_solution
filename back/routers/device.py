import requests
import re
from fastapi import APIRouter, Depends, HTTPException, Body
from pydantic import BaseModel, constr, IPvAnyAddress
from sqlalchemy.orm import Session
from database import get_db
from schemas import DeviceCreate, DeviceOut
from models import Device
from auth import get_current_user  # ✅ JWT에서 사용자 정보 가져옴
from datetime import datetime
from typing import List

router = APIRouter(tags=["Devices"])

@router.post("/", response_model=DeviceOut)
def create_device(
    device: DeviceCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    # 필수 입력 검증
    if not re.match(r"^[\w\s\-\.가-힣]+$", device.name):
        raise HTTPException(status_code=400, detail="기기 이름 형식이 올바르지 않습니다.")

    # ✅ 기기에 Wi-Fi 연결 요청
    try:
        response = requests.post(
            f"http://{device.ip}/wifi-setup",
            json={
                "ssid": device.ssid,
                "password": device.password,
            },
            timeout=5
        )
        response.raise_for_status()
    except requests.exceptions.Timeout:
        raise HTTPException(status_code=504, detail="기기 응답 시간 초과")
    except requests.exceptions.ConnectionError:
        raise HTTPException(status_code=502, detail="기기에 연결할 수 없습니다.")
    except Exception:
        raise HTTPException(status_code=500, detail="Wi-Fi 연결 중 알 수 없는 오류")

    # ✅ DB에 등록
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

@router.delete("/{device_id}", status_code=204)
def delete_device(device_id: int, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    device = db.query(Device).filter(Device.id == device_id, Device.user_id == current_user["user_id"]).first()
    if not device:
        raise HTTPException(status_code=404, detail="기기를 찾을 수 없습니다.")
    db.delete(device)
    db.commit()
    return

@router.get("/", response_model=List[DeviceOut])
def get_devices(db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    devices = db.query(Device).filter(Device.user_id == current_user["user_id"]).all()
    return devices
