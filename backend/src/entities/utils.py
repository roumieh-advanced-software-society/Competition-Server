import requests
import random


def get_latest_data(link, filename):
    sheet_link = ''
    # Link to a Google sheet with the data in it
    with open(link) as file:
        sheet_link = file.readline()

    try:
        print("Downlading data.")
        # The file is expected to be small so I don't need chunked download
        req = requests.get(sheet_link)
        if req.status_code == 200:
            print("Saving to file.")
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


if __name__ == "__main__":
    get_latest_data("teams_spreadsheet.dat", "teams_data.csv")
    get_latest_data("questions_spreadsheet.dat", "questions_data.csv")
