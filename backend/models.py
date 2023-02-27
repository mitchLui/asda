from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)

    scores = relationship("Score", back_populates="owner")


class Score(Base):
    __tablename__ = "scores"

    id = Column(Integer, primary_key=True, index=True)
    # game_mode_id = Column(Integer, ForeignKey("gamemodes.id"), index=True)
    game_mode = Column(Integer, index=True)
    score = Column(Integer, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="scores")
    # game_mode = relationship("Gamemode", back_populates="scores")


# class GameMode(Base):
#     __tablename__ = "gamemodes"
#
#     id = Column(Integer, primary_key=True, index=True)
#     name = Column(String, unique=True, index=True)
#
#     scores = relationship("Score", back_populates="game_mode")
