# coding=utf-8

from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relationship
from marshmallow import Schema, fields

from base import Base


class Team(Base):
    __tablename__ = "teams"
    id = Column(Integer, primary_key=True)
    participant1 = Column(String)
    participant2 = Column(String)
    participant3 = Column(String)
    total_points = Column(Integer)
    username = Column(String)
    password = Column(String)
    email = Column(String)
    scorebook = relationship("Scorebook", uselist=False, back_populates="team")

    def __init__(self, participant1, participant2, participant3, username, password, email):
        self.participant1 = participant1
        self.participant2 = participant2
        self.participant3 = participant3
        self.email = email
        self.username = username
        self.password = password
        self.total_points = 0


class TeamSchema(Schema):
    id = fields.Number()
    participant1 = fields.Str()
    participant2 = fields.Str()
    participant3 = fields.Str()
    total_points = fields.Number()
    username = fields.Str()
    password = fields.Str()
    email = fields.Str()
