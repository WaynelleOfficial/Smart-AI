import uvicorn

from fastapi import FastAPI
from chat_playground.routes import router as chat_playground_router

app = FastAPI()
app.include_router(chat_playground_router)


class Config:
    HOST = "127.0.0.1"
    PORT = 8000 

config = Config()

if __name__ == "__main__":
    @app.get("/")
    def read_root():
        return {"message": "Welcome to the Smart AI API!"} 

    uvicorn.run("main:app", host=config.HOST, port=config.PORT, log_level="info")