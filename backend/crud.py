from sqlalchemy.orm import Session

import models
import schemas


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreate):
    fake_hashed_password = user.password + "notreallyhashed"
    db_user = models.User(username=user.username, hashed_password=fake_hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_scores(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Score).offset(skip).limit(limit).all()


def get_score(db: Session, score_id: int):
    return db.query(models.Score).filter(models.Score.id == score_id).first()


def get_scores_by_gamemode(db: Session, gamemode: int, skip: int = 0, limit: int = 100):
    return db.query(models.Score).filter(models.Score.game_mode == gamemode).offset(skip).limit(limit).all()


def get_user_score(db: Session, user_id: int):
    return db.query(models.Score).filter(models.Score.owner_id == user_id).first()


def get_user_gamemode_score(db: Session, user_id: int, gamemode: int):
    return db.query(models.Score).filter(models.Score.owner_id == user_id and
                                         models.Score.game_mode == gamemode).first()


def create_user_score(db: Session, score: schemas.ScoreCreate, user_id: int):
    db_item = models.Score(**score.dict(), owner_id=user_id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


def update_score(db:Session, score_id: int, new_score:int):
    db_score = db.query(models.Score).filter(models.Score.id == score_id).first()
    if db_score:
        db_score.score = new_score
        db.commit()
        db.refresh(db_score)
    return db_score


# def create_gamemode(db:Session, name: schemas.GamemodeCreate):
#     db_gamemode = models.GameMode(name=name)
#     db.add(db_gamemode)
#     db.commit()
#     db.refresh(db_gamemode)
#     return db_gamemode
#
#
# def get_gamemodes(db: Session, skip: int = 0, limit: int = 100):
#     return db.query(models.GameMode).offset(skip).limit(limit).all()

# def create_user_item(db: Session, item: schemas.ScoreCreate, user_id: int):
#     db_item = models.Score(**item.dict(), owner_id=user_id)
#     db.add(db_item)
#     db.commit()
#     db.refresh(db_item)
#     return db_item