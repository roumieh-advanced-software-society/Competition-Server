# coding=utf-8

from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relationship
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

    def __init__(self, participant1, participant2, participant3, email):
        self.participant1 = participant1
        self.participant2 = participant2
        self.participant3 = participant3
        self.email = email
        self.total_points = 0
        # TODO: generate username and password and ID
