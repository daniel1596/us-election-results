from py.database.core import get_results, execute


def insert_election_data_2020(results: list):
    for result in results:
        state_name, r_pct, d_pct = result
        insert_election_data(state_name, "R", r_pct, 2020)
        insert_election_data(state_name, "D", d_pct, 2020)


def insert_election_data(state_name: str, party_abbr: str, pct: float, year: int, district: int = None):
    electoral_entity_id = get_electoral_entity_id_by_state(state_name, district)
    sql = "INSERT INTO ElectoralVote (Percentage, PoliticalPartyAbbreviation, Year, ElectoralEntityID)" \
          " VALUES (?, ?, ?, ?)"
    params = (pct, party_abbr, year, electoral_entity_id)

    execute(sql, params)


def get_electoral_entity_id_by_state(state_name: str, district: int = None) -> int:
    state_id = get_state_id_by_name(state_name)

    sql = "SELECT ID FROM ElectoralEntity WHERE StateID = ?" + \
          (" AND DistrictNumber = ?" if district else "")
    params = (state_id, district) if district else (state_id,)

    return get_results(sql, params)[0][0]


def get_state_id_by_name(state_name: str) -> int:
    # Indexed twice at 0 - 0th row of results and 0th column
    return get_results("SELECT ID FROM State WHERE Name = ? ", (state_name,))[0][0]


def select_election_data(year: int = None):
    sql = "SELECT ev.Percentage," \
          " ev.PoliticalPartyAbbreviation, " \
          " ev.Year," \
          " s.Name," \
          " ee.DistrictNumber " \
          "FROM ElectoralVote AS ev" \
          " INNER JOIN ElectoralEntity AS ee on ev.ElectoralEntityID = ee.ID" \
          " INNER JOIN State AS s ON ee.StateID = s.ID"

    if year:
        sql += f" WHERE year = {year}" # not getting data from client

    return get_results(sql)
