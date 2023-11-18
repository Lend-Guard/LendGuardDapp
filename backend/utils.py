from backend.database.configs import VaultSession
from backend.debank_connector import DebankConnector

from backend.configs import DEBANK_API_KEY

def get_debank_connector():
    return DebankConnector(DEBANK_API_KEY)

def get_vault_db():
    try:
        db = VaultSession()
        yield db
    finally:
        db.close()
