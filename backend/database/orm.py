import os
from dotenv import load_dotenv
from sqlalchemy import create_engine,select, func, desc, Column, String, Integer, ForeignKey, TIMESTAMP, Float,text,DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
import datetime

# DB_CONN = os.getenv("DB_CONN")
# DATABASE_URL = DB_CONN
# engine = create_engine(DATABASE_URL)
# connection = engine.connect()

Base = declarative_base()


class UserModel(Base):
    __tablename__ = 'user_model'
    id = Column(Integer, primary_key=True)
    healthRatioNotification = Column(Float)
    healthRatioExecution = Column(Float)
    targetHealthRatio = Column(Float)
    address = Column(String)



def update_setting(session,healthRatioNotification, healthRatioExecution, targetHealthRatio, address):
    try: 

        user = session.execute(select(UserModel).where(UserModel.address == address)).first()

        if user:
            user.healthRatioNotification = healthRatioNotification
            user.healthRatioExecution = healthRatioExecution
            user.targetHealthRatio = targetHealthRatio
        else:
            new_user = UserModel(
                healthRatioNotification=healthRatioNotification,
                healthRatioExecution=healthRatioExecution,
                targetHealthRatio=targetHealthRatio,
                address=address
            )
            session.add(new_user)

        session.commit()

        session.close()

    except Exception as e:
        print(e)

def get_setting(session, address: str):
    return session.query(UserModel).filter(UserModel.address == address).first()        
