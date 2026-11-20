from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import Base, engine
from .routers import auth, chat, templates

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Prelegal API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(chat.router)
app.include_router(templates.router)


@app.get("/api/health")
def health_check():
    return {"status": "healthy"}
