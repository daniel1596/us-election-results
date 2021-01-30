from database.elections import select_election_data, insert_election_data_2000


def main():
    insert_election_data_2000([
        ["District of Columbia", 8.95, 85.16],
        ["Georgia", 54.67, 42.98],
        ["Hawaii", 37.46, 55.79],
        ["Idaho", 67.17, 27.64],
        ["Illinois", 42.58, 54.6],
        ["Indiana", 56.65, 41.01],
        ["Iowa", 48.22, 48.54],
        ["Kansas", 58.04, 37.24],
        ["Kentucky", 56.5, 41.37],
        ["Louisiana", 52.55, 44.88]
    ])

    for row in select_election_data():
        print(row)


if __name__ == "__main__":
    main()