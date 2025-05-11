from fastapi import APIRouter, HTTPException
from botocore.exceptions import ClientError
from . import models
from . import services

router = APIRouter()

@router.post("/chat/model/chat/anthropic.claude-v2/invoke")

def invoke(body: models.ChatRequest):

    try:
        print("did u get the prompt? Prompt: "+ body.prompt)
        completion = services.invoke(body.prompt)
        # print("did u get the ans? Response :"+ completion)
        return models.ChatResponse(
            completion=completion
        )
    except ClientError as e:
        if e.response["Error"]["Code"] == "AccessDeniedException":
            raise HTTPException(status_code=403)
        elif e.response["Error"]["Code"] == "ValidationException":
            raise HTTPException(status_code=422)
        else:
            raise HTTPException(status_code=500)