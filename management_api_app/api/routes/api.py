from fastapi import APIRouter

from api.routes import ping, health


router = APIRouter()
router.include_router(ping.router, tags=["ping"])
router.include_router(health.router, tags=["health"])