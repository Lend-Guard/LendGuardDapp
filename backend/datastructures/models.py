from pydantic import BaseModel


class HealthSettings(BaseModel):
    health_ratio_notification: float
    health_ratio_execution: float
    target_health_ratio: float
    address: str
