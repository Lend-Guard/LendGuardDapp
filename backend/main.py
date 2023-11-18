from typing import Dict, Any

from fastapi import Depends, FastAPI, HTTPException, status
from sqlalchemy.orm import Session

from backend.datastructures.models import HealthSettings
from backend.debank_connector import DebankConnector
from backend.database.orm import update_setting

from backend.utils import get_vault_db, get_debank_connector


app = FastAPI()

# [System Call] Status check
@app.get("/status", status_code=status.HTTP_200_OK)
async def status():
    return {"status": "OK"}

# [DB Call] Update settings
@app.post("/update_settings_healths", status_code=201)
async def update_settings_healths(settings: HealthSettings, session: Session = Depends(get_vault_db)):
    try:
        update_setting(session, settings)
        return {"message": "Settings updated successfully", "data": settings}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to update settings {e}")

# [DB Call] Get settings
@app.get("/get_setting/{address}", response_model=HealthSettings)
def get_setting(address: str, db: Session = Depends(get_vault_db)):
    user_setting = get_setting(db, address)
    if user_setting is None:
        raise HTTPException(status_code=500, detail="Setting not found")
    return user_setting

# [Debank Call] Get vaults & users (mocked)
@app.get("/get_vaults_users")
def get_vaults_users(db: Session = Depends(get_vault_db)):
    pass

# [Debank Call] Get user portfolio
@app.get("/get_user_portfolio/{user_id}")
def get_user_portfolio(user_id: str):
    debank_connector: DebankConnector = get_debank_connector()
    result: Dict[str, Any] = debank_connector.get_user_portfolio(user_id=user_id)
    if result is None:
        raise HTTPException(status_code=500, detail="User not found")
    
    return result

# [Debank Call] Get protocol info
@app.get("/get_protocol_info/{protocol_id}")
def get_protocol_info(protocol_id: str):
    debank_connector: DebankConnector = get_debank_connector()
    result: Dict[str, Any] = debank_connector.get_protocol_info(protocol_id=protocol_id)
    if result is None:
        raise HTTPException(status_code=500, detail="Protocol not found")
    
    return result

# [Debank Call] Get token info
@app.get("/get_token_info/{chain_id}/{token_id}")
def get_token_info(chain_id: str, token_id: str):
    debank_connector: DebankConnector = get_debank_connector()
    result: Dict[str, Any] = debank_connector.get_token_info(token_address=token_id, chain_id=chain_id)
    if result is None:
        raise HTTPException(status_code=500, detail="Token not found")
    
    return result

# [Debank Call] Get chain info
@app.get("/get_chain_info/{chain_id}")
def get_chain_info(chain_id: str):
    debank_connector: DebankConnector = get_debank_connector()
    result: Dict[str, Any] = debank_connector.get_chain_info(chain_id=chain_id)
    if result is None:
        raise HTTPException(status_code=500, detail="Chain not found")
    
    return result

# [Debank Call] Get user protocol position
@app.get("/get_user_protocol_position/{protocol_id}/{user_id}")
def get_user_protocol_position(protocol_id: str, user_id: str):
    debank_connector: DebankConnector = get_debank_connector()
    result: Dict[str, Any] = debank_connector.get_user_protocol_position(protocol_id=protocol_id, user_id=user_id)
    if result is None:
        raise HTTPException(status_code=500, detail="User position not found")
    
    return result
