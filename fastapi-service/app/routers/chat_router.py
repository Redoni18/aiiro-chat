from fastapi import APIRouter
from pydantic import BaseModel
from app.controllers import chat_controller

router = APIRouter()

class PromptRequest(BaseModel):
    prompt: str

@router.post("/generate")
async def generate_response(request: PromptRequest):
    return await chat_controller.generate_response(prompt=request.prompt)