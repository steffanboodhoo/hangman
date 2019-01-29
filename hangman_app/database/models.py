from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, ForeignKey, BigInteger, Boolean
from Utils import Util
Base = declarative_base()

class Word(Base):
    __tablename__ = 'word'
    word_id = Column(Integer, primary_key=True)
    word = Column(String(26))

class Score(Base):
    __tablename__ = 'score'
    score_id = Column(Integer, primary_key=True)
    credentials = Column(String(3))
    score = Column(Integer)

hangman_engine = create_engine(Util.database_uri, echo=False)
Base.metadata.create_all(hangman_engine)