from sqlalchemy import select, Column, String, Integer, Float
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()


class UserModel(Base):
    """
    Base class for User model.
    Each user has a unique wallet address and can have multiple settings.
    Also user is connected to a specific vault one to one.

    Args:
        Base (_type_): _description_
    """
    __tablename__ = 'user_model'

    id = Column(Integer, primary_key=True, comment='id')
    health_ratio_notification = Column(Float, comment='healthRatioNotification')
    health_ratio_execution = Column(Float, comment='healthRatioExecution')
    target_health_ratio = Column(Float, comment='targetHealthRatio')
    address = Column(String, comment='address')
    vault_address = Column(String, comment='vault_address', default=None)


def update_setting(
        session, health_ratio_notification: float,
        health_ratio_execution: float, target_health_ratio: float, address: str
        ) -> None:
    """
    Update user's settings.

    Args:
        session: engine.connect()
        health_ratio_notification (float)
        health_ratio_execution (float)
        target_health_ratio (float)
        address (str)
    """
    try: 

        user = session.execute(select(UserModel).where(UserModel.address == address)).first()

        if user:
            user.health_ratio_notification = health_ratio_notification
            user.health_ratio_execution = health_ratio_execution
            user.target_health_ratio = target_health_ratio
        else:
            new_user = UserModel(
                healthRatioNotification=health_ratio_notification,
                healthRatioExecution=health_ratio_execution,
                targetHealthRatio=target_health_ratio,
                address=address
            )
            session.add(new_user)

        session.commit()

        session.close()

    except Exception as e:
        print(e)


def get_setting(session, address: str):
    """
    Get user's settings.

    Args:
        session: engine.connect()
        address (str): user's wallet address
    """
    return session.query(UserModel).filter(UserModel.address == address).first()        
