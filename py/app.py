from py.csv.csv_reader import get_presidential_election_results
from py.database.insert import insert_into_db


def main():
    election_results = get_presidential_election_results('../data/1976-2020-president.csv')
    insert_into_db(election_results)


if __name__ == "__main__":
    main()