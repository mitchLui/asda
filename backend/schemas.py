from pydantic import BaseModel


class ScoreBase(BaseModel):
    game_mode: int
    score: int | int = 0


class ScoreCreate(ScoreBase):
    pass


class Score(ScoreBase):
    id: int
    owner_id: int

    class Config:
        orm_mode = True


class UserBase(BaseModel):
    username: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int
    scores: list[Score] = []

    class Config:
        orm_mode = True


# class GamemodeBase(BaseModel):
#     name: str
#
#
# class GamemodeCreate(GamemodeBase):
#     pass
#
#
# class Gamemode(GamemodeBase):
#     id: int
#     scores: list[Score] = []
