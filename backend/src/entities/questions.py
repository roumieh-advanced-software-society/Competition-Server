# coding=utf-8

from sqlalchemy import Column, String, Integer
from base import Base


class Question(Base):
    __tablename__ = "questions"
    id = Column(Integer, primary_key=True)
    number = Column(Integer)
    title = Column(String)
    text = Column(String)
    answer = Column(String)
    points = Column(Integer)
    code_required = Column(String)

    def __init__(self, number, title, text, answer, points, code):
        self.number = number
        self.title = title
        self.text = text
        self.answer = answer
        self.points = points
        self.code_required == code
