import requests
import random
import csv
from base import Session, engine, Base
from teams import Team
from scorebook import Scorebook
from questions import Question


def get_latest_data(link, filename):
    sheet_link = ''
    # Link to a Google sheet with the data in it
    with open(link) as file:
        sheet_link = file.readline()

    try:
        print(f"Downlading data from {link}.")
        # The file is expected to be small so I don't need chunked download
        req = requests.get(sheet_link)
        if req.status_code == 200:
            print(f"Saving to {filename}.")
            with open(filename, 'wb') as file:
                file.write(req.content)
        else:
            print("Error getting the data.")
    except:
        print("Could not retieve sheet.")


def generate_password():
    Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    alphabet = Alphabet.lower()
    digits = "1234567890"
    return ''.join(random.choices(Alphabet + alphabet + digits, k=10))


def insert_questions(filename):
    questions = []
    # Retrieveing the questions from the .csv file
    with open(filename, newline='') as infile:
        questions_reader = csv.reader(infile)
        next(questions_reader, None)  # Skip the header row
        for row in questions_reader:
            questions.append(Question(int(row[0]), row[1], row[2], row[3], int(row[4]), row[5]))

    # generate database schema
    Base.metadata.create_all(engine)
    # start session
    session = Session()
    # Delete all existing scorebooks
    session.query(Scorebook).delete(synchronize_session=False)
    session.commit()
    for question in questions:
        session.add(question)
        session.commit()
    # Regenerate scorebooks
    generate_scoreboooks()


def insert_teams(filename):
    teams = []
    # Retrieveing the questions from the .csv file
    with open(filename, newline='') as infile:
        teams_reader = csv.reader(infile)
        next(teams_reader, None)  # Skip the header row
        for row in teams_reader:
            teams.append(Team(row[2], row[3], row[4], row[1], generate_password(), row[6]))

    # generate database schema
    Base.metadata.create_all(engine)
    # start session
    session = Session()
    teams_db = session.query(Team.username).all()
    for team in teams:
        if (team.username,) not in teams_db:
            session.add(team)
            session.commit()


def generate_scoreboooks():
    # generate database schema
    Base.metadata.create_all(engine)
    # start session
    session = Session()
    teams_db = session.query(Team.id).all()
    questions_ids = []
    for i in range(11):
        questions_ids.append(session.query(Question.id).filter(Question.number==i+1).all())
    scorebooks_db = session.query(Scorebook.team_id).all()
    for team in teams_db:
        if team not in scorebooks_db:
            random_questions = []
            for i in range(11):
                random_questions.append(random.choice(questions_ids[i])[0])
            scorebook = Scorebook(team[0], random_questions)
            session.add(scorebook)
            session.commit()


def reset_db():
    # generate database schema
    Base.metadata.create_all(engine)
    # start session
    session = Session()
    session.query(Scorebook).delete(synchronize_session=False)
    session.commit()
    session.query(Question).delete(synchronize_session=False)
    session.commit()
    session.query(Team).delete(synchronize_session=False)
    session.commit()


def get_db_rows():
    # generate database schema
    Base.metadata.create_all(engine)
    # start session
    session = Session()
    print(len(session.query(Scorebook).all()))
    print(len(session.query(Team).all()))
    print(len(session.query(Question).all()))


if __name__ == "__main__":
    #get_latest_data("teams_spreadsheet.dat", "teams_data.csv")
    #get_latest_data("questions_spreadsheet.dat", "questions_data.csv")
    #insert_teams("teams_data.csv")
    #insert_questions("questions_data.csv")
    get_db_rows()
