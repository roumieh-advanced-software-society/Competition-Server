from flask import Flask, jsonify, request
from base import Session, engine, Base
from teams import Team, TeamSchema
from scorebook import Scorebook
from questions import Question


# creating the Flask application
app = Flask(__name__)

# if needed, generate database schema
Base.metadata.create_all(engine)


@app.route('/login', methods=['POST'])
def login():
    username = request.values.get('username')
    password = request.values.get('password')

    # persist exam
    session = Session()
    result = session.query(Team.id).filter(Team.username == username, Team.password == password).all()
    if len(result) > 0:
        return_val = {
            "success": True,
            "team_id": result[0][0]
        }
        return jsonify(return_val), 200
    else:
        return_val = {
            "success": False,
            "team_id": 0
        }
        return jsonify(return_val), 200
