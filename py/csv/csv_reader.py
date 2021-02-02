from csv import DictReader
from typing import List, Dict

# I feel election results should only go back to this year, as
# Clinton was a less polarizing president than those who came after him
minimum_year = 2000


def get_presidential_election_results(csv_file_path: str) -> List[Dict]:
    """
    Get election results from the CSV file courtesy of https://electionlab.mit.edu/data
    Doesn't have district data for Nebraska and Maine... sadly.
    Maybe one day later I will get that
    """
    rows = []

    with open(csv_file_path, "r") as file:
        for row in DictReader(file):
            if (int(year := row["year"]) < minimum_year):
                continue

            party = row["party_simplified"].title()
            votes_for_candidate = int(row["candidatevotes"])
            votes_total = int(row["totalvotes"])

            rows.append({
                "state_abbr": row["state_po"],
                "office": row["office"],
                "party": party,
                "vote_percent": 100 * round(votes_for_candidate / votes_total, 5),
                "votes_for_candidate": votes_for_candidate,
                "year": year
            })

    return rows
