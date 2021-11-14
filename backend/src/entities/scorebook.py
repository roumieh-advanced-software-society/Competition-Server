# coding=utf-8

from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from base import Base


class Scorebook(Base):
    __tablename__ = "scorebook"
    id = Column(Integer, primary_key=True)
    QID1 = Column(Integer, ForeignKey("questions.id"))
    QID2 = Column(Integer, ForeignKey("questions.id"))
    QID3 = Column(Integer, ForeignKey("questions.id"))
    QID4 = Column(Integer, ForeignKey("questions.id"))
    QID5 = Column(Integer, ForeignKey("questions.id"))
    QID6 = Column(Integer, ForeignKey("questions.id"))
    QID7 = Column(Integer, ForeignKey("questions.id"))
    QID8 = Column(Integer, ForeignKey("questions.id"))
    QID9 = Column(Integer, ForeignKey("questions.id"))
    QID10 = Column(Integer, ForeignKey("questions.id"))
    QID11 = Column(Integer, ForeignKey("questions.id"))
    solved = Column(String(length=11))
    team_id = Column(Integer, ForeignKey("teams.id"))
    team = relationship("Team", uselist=False, back_populates="scorebook")

    def __init__(self, team_id, question_ids):
        # TODO
        self.team_id = team_id
        if len(question_ids) == 11:
            for i in range(len(question_ids)):
                exec(f"self.QID{i+1} = {question_ids[i]}")
        self.solved = '0' * 11
