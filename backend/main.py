from fastapi import Depends, FastAPI, HTTPException,status
from pydantic import BaseModel
from datastructures.models import HealthSettings
from database.orm import update_setting
from sqlalchemy.orm import Session
from database.configs import VaultSession

app = FastAPI()


def get_vault_db():
    db = VaultSession()
    try:
        yield db
    finally:
        db.close()

@app.post("/update_settings_healths", status_code=status.HTTP_201_CREATED)
async def update_settings_healths(settings: HealthSettings, session: Session = Depends(get_vault_db)):
    try:
        update_setting(session, settings.dict())
        return {"message": "Settings updated successfully", "data": settings.dict()}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Failed to update settings")


@app.get("/get_setting/{address}", response_model=HealthSettings)
def get_setting(address: str, db: Session = Depends(get_vault_db)):
    user_setting = get_setting(db, address)
    if user_setting is None:
        raise HTTPException(status_code=404, detail="Setting not found")
    return user_setting