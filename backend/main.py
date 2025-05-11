import uvicorn

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from chat_playground.routes import router as chat_playground_router

app = FastAPI()
app.include_router(chat_playground_router)





class Config:
    HOST = "127.0.0.1"
    PORT = 8000 #backend

config = Config()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  #frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# prevents browser errors when your frontend talks to the backend.

if __name__ == "__main__":
    @app.get("/")
    def read_root():
        return {"message": "Welcome to the Smart AI API!"} 

    uvicorn.run("main:app", host=config.HOST, port=config.PORT, log_level="info")