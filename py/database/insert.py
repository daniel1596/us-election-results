from typing import Dict, List

from py.database.core import execute_many, select_single_value

"""New file for inserting results into the db based on CSV data"""


def insert_into_db(election_results: List[Dict]):
    insert_sql = \
        f" INSERT INTO StateElectionVoteTally" \
        f"  (VoteCount, PoliticalPartyAbbreviation, Year, StateID, ElectoralVoteTYpeID)" \
        f" VALUES (?, ?, ?, ?, ?)"

    # For the party abbreviation, we need to use the LIKE operator because our party name is "Democratic"
    # and the data set uses the word "Democrat"
    get_party_abbr_sql = "SELECT Abbreviation FROM PoliticalParty WHERE Name LIKE ? || '%'"
    get_state_id_sql = "SELECT ID FROM State WHERE Abbreviation = ?"

    values_to_insert = []  # this will bea list of tuples, I believe
    for result in election_results:
        vote_type = "P" if result["office"] == "US PRESIDENT" else ""
        party_abbr = select_single_value(get_party_abbr_sql, (result["party"],))
        state_id = select_single_value(get_state_id_sql, (result["state_abbr"],))

        values = (result["votes_for_candidate"], party_abbr, int(result["year"]), state_id, vote_type)
        values_to_insert.append(values)

    execute_many(insert_sql, values_to_insert)
