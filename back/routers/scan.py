from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Device, ScanResult
import subprocess
import datetime
import re
import xmltodict
from pydantic import BaseModel

router = APIRouter()

# ✅ 포트 문자열 파싱 (간단한 표 형식용)
def parse_ports(nmap_output: str):
    ports = []
    for line in nmap_output.splitlines():
        match = re.match(r"(\d+/tcp)\s+(\w+)\s+(\S+)", line)
        if match:
            ports.append({
                "port": match.group(1),
                "state": match.group(2),
                "service": match.group(3)
            })
    return ports

# ✅ 실제 스캔 실행 API
@router.post("/{device_id}")
def scan_device(device_id: int, db: Session = Depends(get_db)):
    device = db.query(Device).filter(Device.id == device_id).first()
    if not device:
        raise HTTPException(status_code=404, detail="Device not found")

    try:
        process = subprocess.Popen(
            ["nmap", "-sV", "-Pn", "--script", "vuln", "-T4", "-oX", "-", device.ip],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        stdout, stderr = process.communicate()

        if process.returncode != 0:
            raise Exception(stderr)

        parsed = xmltodict.parse(stdout)
        score, summary = evaluate_device(parsed)

        scan_result = ScanResult(
            device_id=device_id,
            scan_date=datetime.datetime.utcnow(),
            vulnerabilities=stdout,
            score=score,
            result_summary=summary
        )
        db.add(scan_result)
        db.commit()
        return {"message": "Scan completed", "score": score, "summary": summary}

    except Exception as e:
        print("\u274c 스캔 실패:", str(e))
        raise HTTPException(status_code=500, detail=f"Scan failed: {str(e)}")

# ✅ 최신 결과 조회
@router.get("/result/{device_id}")
def get_scan_result(device_id: int, db: Session = Depends(get_db)):
    result = (
        db.query(ScanResult)
        .filter(ScanResult.device_id == device_id)
        .order_by(ScanResult.scan_date.desc())
        .first()
    )
    if not result:
        raise HTTPException(status_code=404, detail="No scan result found")

    return {
        "scan_date": result.scan_date,
        "parsed_ports": parse_ports(result.vulnerabilities),
        "raw_output": result.vulnerabilities,
        "score": result.score,
        "summary": result.result_summary
    }

# ✅ 전체 히스토리 조회 추가
@router.get("/result/history/{device_id}")
def get_scan_history(device_id: int, db: Session = Depends(get_db)):
    results = (
        db.query(ScanResult)
        .filter(ScanResult.device_id == device_id)
        .order_by(ScanResult.scan_date.desc())
        .all()
    )
    return [
        {
            "id": r.id,
            "scan_date": r.scan_date,
            "parsed_ports": parse_ports(r.vulnerabilities),
            "raw_output": r.vulnerabilities,
            "score": r.score,
            "summary": r.result_summary
        }
        for r in results
    ]

# ✅ 결과 ID ID\uub85c 조회 (상세 보기용)
@router.get("/result/detail/{result_id}")
def get_scan_result_by_id(result_id: int, db: Session = Depends(get_db)):
    result = db.query(ScanResult).filter(ScanResult.id == result_id).first()
    if not result:
        raise HTTPException(status_code=404, detail="Scan result not found")

    return {
        "scan_date": result.scan_date,
        "parsed_ports": parse_ports(result.vulnerabilities),
        "raw_output": result.vulnerabilities,
        "score": result.score,
        "summary": result.result_summary
    }

# ✅ 점수 평가용 엔드포인트 (개발자용)
class XmlInput(BaseModel):
    xml_text: str

@router.post("/parse")
async def parse_nmap_result(data: XmlInput):
    try:
        parsed = xmltodict.parse(data.xml_text)
        score, summary = evaluate_device(parsed)
        return {"result": parsed, "score": score, "summary": summary}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# ✅ 평가 기준 기본 점수화 및 요약화

def evaluate_device(parsed):
    score = 100
    messages = []

    try:
        hosts = parsed.get("nmaprun", {}).get("host", [])
        if isinstance(hosts, dict):
            hosts = [hosts]

        for host in hosts:
            ports = host.get("ports", {}).get("port", [])
            if isinstance(ports, dict):
                ports = [ports]

            open_ports = 0
            for port in ports:
                state = port.get("state", {}).get("@state")
                portid = port.get("@portid")
                service_name = port.get("service", {}).get("@name", "")

                if state == "open":
                    open_ports += 1
                    if portid == "21":
                        score -= 15
                        messages.append("FTP 서비스 감지 (21번 포트)")
                    if portid == "23":
                        score -= 15
                        messages.append("Telnet 서비스 감지 (23번 포트)")
                    if service_name in ["irc", "x11"]:
                        score -= 10
                        messages.append(f"불필요 서비스 감지: {service_name}")

            if open_ports > 10:
                score -= 20
                messages.append(f"포트 과다 개발 ({open_ports}개)")

            os_match = host.get("os", {}).get("osmatch")
            if os_match:
                score -= 10
                messages.append("운영체제 정보 노출 감지")

    except Exception as e:
        score -= 10
        messages.append("스캔 결과 해석 실패")

    final_score = max(score, 0)
    summary = " / ".join(messages) if messages else "심각한 보안 위협은 발견되지 않았습니다."
    return final_score, summary
