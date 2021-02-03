from py.csv.csv_reader import get_presidential_election_results
from py.database.insert import insert_into_db


def main():
    election_results = get_presidential_election_results('../data/1976-2020-president.csv')
    insert_into_db(election_results)


def print_warning_message():
    print("NOTE: The data has already been imported into the SQLite database."
          "\nPlease do not re-run unless there is an error in the data and it has been removed from the db.")


if __name__ == "__main__":
    print_warning_message()
