from flask import Flask, jsonify, request
from flask_cors import CORS
from base import Session, engine, Base
from teams import Team, TeamSchema
from scorebook import Scorebook
from questions import Question


# creating the Flask application
app = Flask(__name__)
CORS(app)

# if needed, generate database schema
Base.metadata.create_all(engine)


@app.route('/login', methods=['POST'])
def login():
    username = request.values.get('username')
    password = request.values.get('password')

    session = Session()
    result = session.query(Team.id).\
        filter(Team.username == username, Team.password == password).first()
    if result is not None:
        return_val = {
            "success": True,
            "team_id": result[0]
        }
        return jsonify(return_val)
    else:
        return_val = {
            "success": False,
            "team_id": 0
        }
        return jsonify(return_val)


@app.route('/home', methods=['POST'])
def home():
    team_id = request.values.get('TeamID')
    session = Session()
    team_points = session.query(Team.total_points)\
        .filter(Team.id == team_id).first()
    team_points = team_points[0]
    solved = session.query(Scorebook.solved)\
        .filter(Scorebook.team_id == team_id).first()[0]

    solved = list(map(bool, map(int, list(solved))))
    return_val = {
        "teamPoints": team_points,
        "section": [
            {
                "completed": solved[:3],
                "unlocked": True
            },
            {
                "completed": solved[3:6],
                "unlocked": bool(sum(solved[:3]))
            },
            {
                "completed": solved[6:9],
                "unlocked": bool(sum(solved[3:6]))
            }
        ]
    }
    return jsonify(return_val), 200


@app.route('/getQuestion', methods=['POST'])
def getQuestion():
    team_id = request.values.get('TeamID')
    q_nbr = request.values.get('Q_Number')
    session = Session()
    q_id = eval(f"session.query(Scorebook.QID{q_nbr}).filter(Scorebook.team_id == {team_id}).first()")
    q_id = q_id[0]
    question = session.query(Question.title, Question.text, Question.code_required).filter(Question.id == q_id).first()
    return_val = {
        'questionTitle': question[0],
        'question': question[1],
        'isCode': (True if question[2]=='Yes' else False)
    }
    return jsonify(return_val), 200


@app.route('/verifyQuestion', methods=['POST'])
def verifyQuestion():
    team_id = request.values.get('TeamID')
    q_nbr = request.values.get('Q_Number')
    answer = request.values.get('Flag')
    session = Session()
    q_id = eval(f"session.query(Scorebook.QID{q_nbr}).filter(Scorebook.team_id == {team_id}).first()")
    q_id = q_id[0]
    question = session.query(Question).filter(Question.id == q_id).first()
    real_answer = question.answer
    if answer in real_answer:
        return_val = {"correct": True}
        # update scorebook
        scorebook = session.query(Scorebook).filter(Scorebook.team_id == team_id).first()
        solved = list(scorebook.solved)
        solved[int(q_nbr) - 1] = '1'
        solved = ''.join(solved)
        session.query(Scorebook).\
           filter(Scorebook.id == scorebook.id).\
           update({"solved": (solved)})
        session.commit()
        team = session.query(Team).filter(Team.id == team_id).\
            update({"total_points": (Team.total_points + question.points)})
        session.commit()
    else:
        return_val = {"correct": False}
    return jsonify(return_val), 200
