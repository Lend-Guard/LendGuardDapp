import os

from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine


db_vault_creds = os.getenv('DB_CONN', '')

db_vault_url = db_vault_creds
db_vault_engine = create_engine(db_vault_url)

VaultSession = sessionmaker(bind=db_vault_engine)
