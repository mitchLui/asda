import asyncio

from fastapi import Depends, FastAPI, HTTPException, WebSocket, WebSocketDisconnect
from sqlalchemy.orm import Session
from fastapi.encoders import jsonable_encoder

import crud
import models
import schemas
from database import SessionLocal, engine

from asyncio import sleep

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    return crud.create_user(db=db, user=user)


@app.get("/users/", response_model=list[schemas.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users


@app.get("/users/{user_id}", response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@app.post("/users/{user_id}/score/", response_model=schemas.Score)
def create_score_for_user(user_id: int, score: schemas.ScoreCreate, db: Session = Depends(get_db)):
    return crud.create_user_score(db=db, score=score, user_id=user_id)


@app.get("/users/{user_id}/scores", response_model=schemas.Score)
def get_score_by_user_id(user_id: int, db: Session = Depends(get_db)):
    db_score = crud.get_user_score(db, user_id=user_id)
    if db_score is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_score


@app.post("/users/{user_id}/scores/{gamemode}", response_model=schemas.Score)
def update_score(user_id: int, gamemode:int, score: int, db: Session = Depends(get_db)):
    db_score: schemas.Score = crud.get_user_gamemode_score(db, user_id=user_id, gamemode=gamemode)
    if db_score is None:
        raise HTTPException(status_code=400, detail="score no no")
    return crud.update_score(db=db, score_id=db_score.id, new_score=score)


@app.get("/scores/", response_model=list[schemas.Score])
def get_scores(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    scores = crud.get_scores(db, skip=skip, limit=limit)
    return scores


@app.get("/scores/{gamemode}")#, response_model=list[tuple[schemas.Score, schemas.User]])
def get_score_by_gamemode(gamemode: int, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    db_score: list[tuple[schemas.Score, schemas.User]] = crud.get_scores_by_gamemode(db, gamemode=gamemode, skip=skip, limit=limit)
    if db_score is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_score


@app.post("/scores/{score_id}", response_model=schemas.Score)
def update_score(score_id: int, score: int, db: Session = Depends(get_db)):
    db_user = crud.get_score(db, score_id=score_id)
    if db_user is None:
        raise HTTPException(status_code=400, detail="score no no")
    return crud.update_score(db=db, score_id=score_id, new_score=score)


class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)


manager = ConnectionManager()

@app.websocket("/ws/{gamemode}")
async def websocket_endpoint(websocket: WebSocket, gamemode:int, db: Session = Depends(get_db)):
    await manager.connect(websocket)
    try:
        data = None
        while True:
            new = crud.get_scores_by_gamemode(db=db, gamemode=gamemode)
            new = [row.score for row in new]
            if data != new:
                data = new
                print(data)
                print(jsonable_encoder(data))
                await websocket.send_json(jsonable_encoder(data))
            else:
                print("..", new)
            await asyncio.sleep(5)
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast(f"Client # left the chat")

