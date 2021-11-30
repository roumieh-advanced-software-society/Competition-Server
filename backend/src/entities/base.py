# coding=utf-8

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

db_url = 'localhost:5432'
db_name = 'competition'
db_user = 'usr'
db_password = 'pass'
engine = create_engine(f'postgresql://{db_user}:{db_password}@{db_url}/{db_name}', pool_size=20, max_overflow=0)
Session = sessionmaker(bind=engine)

Base = declarative_base()
