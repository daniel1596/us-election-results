from py.database.elections_scripting_original import insert_election_data, select_election_data, insert_election_data_2020


def insert_district_data(year: int):
    insert_election_data("Maine", "D", 60.11, year, 1)
    insert_election_data("Maine", "R", 37.02, year, 1)
    insert_election_data("Maine", "D", 44.82, year, 2)
    insert_election_data("Maine", "R", 52.26, year, 2)

    insert_election_data("Nebraska", "D", 41.09, year, 1)
    insert_election_data("Nebraska", "R", 56.01, year, 1)
    insert_election_data("Nebraska", "D", 51.95, year, 2)
    insert_election_data("Nebraska", "R", 45.45, year, 2)
    insert_election_data("Nebraska", "D", 22.34, year, 3)
    insert_election_data("Nebraska", "R", 78.36, year, 3)


def main():
    # insert_district_data(2020)
    # insert_election_data_2020([])

    for row in select_election_data(year=2008):
        print(row)


if __name__ == "__main__":
    main()
