from pydantic import BaseModel

class ChatRequest(BaseModel):
    prompt: str

class ChatResponse(BaseModel):
    completion: str

#Python classes into smart data containers and is type checking

#ChatRequest must contain a string field called prompt
    
#ChatResponse must contain a string field called completion