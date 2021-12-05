## Database
The database was created using this Docker command:
```
docker run --name competition-db \
    -e POSTGRES_PASSWORD=pass \
    -e POSTGRES_USER=usr \
    -e POSTGRES_DB=competition \
    -p 5432:5432 \
    -d postgres
```
    
And it was interfaced with using SQLAlchemy. Many utility functions to interact with the database are in `utils.py`.

The data for each question and each team was initially hosted on [Google Sheets](https://docs.google.com/spreadsheets/u/0/) to allow collaborative editing. Each sheet was then downloaded as a CSV file and parsed then inserted into the database.

## Server
A Flask server serves as the backend and exposes endpoints to verify login attempts, get the status of each team's home page (locked/unlocked questions and total score), get a question's statement, and verify an answer.
