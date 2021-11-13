# coding=utf-8

from sqlalchemy import Column, String, Integer
from base import Base


class Question(Base):
    __tablename__ = "questions"
    id = Column(Integer, primary_key=True)
    number = Column(Integer)
    text = Column(String)
    answer = Column(String)
    points = Column(Integer)

    def __init__(self, number, text, answer, points):
        self.number = number
        self.text = text
        self.answer = answer
        self.points = points
        # TODO: generate username and password and ID
