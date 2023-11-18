from pydantic import BaseModel

class HealthSettings(BaseModel):
    healthRatioNotification: float
    healthRatioExecution: float
    targetHealthRatio: float
    address: str