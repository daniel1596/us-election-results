from typing import Dict, List

from py.database.core import execute_many, get_single_result

"""New file for inserting results into the db based on CSV data"""

def insert_into_db(election_results: List[Dict]):
    insert_sql = \
        f" INSERT INTO StateElectionVoteTally" \
        f"  (VoteCount, PoliticalPartyAbbreviation, Year, StateID, ElectoralVoteTYpeID)" \
        f" VALUES (?, ?, ?, ?, ?)"

    get_party_abbr_sql = "SELECT Abbreviation FROM PoliticalParty WHERE Name = ?"
    get_state_id_sql = "SELECT ID FROM State WHERE Abbreviation = ?"

    for result in election_results:
        vote_type = "P" if result["office"] == "US PRESIDENT" else ""
        party_abbr = get_single_result(get_party_abbr_sql, (result["party"],))
        state_id = get_single_result(get_state_id_sql, (result["state_abbr"],))

    breakpoint()
    # execute_many()