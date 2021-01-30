from sqlite3.dbapi2 import connect
from typing import List, Tuple

db_location = "presidential-election-voting-patterns.sqlite"


def execute(sql: str, params: Tuple = None):
    connection = connect(db_location)
    connection.execute(sql) if not params \
        else connection.execute(sql, params)

    connection.commit()
    connection.close()



def get_results(sql: str, params: Tuple = None) -> List:
    connection = connect(db_location)
    cursor = connection.execute(sql) if not params \
        else connection.execute(sql, params)

    data = cursor.fetchall()
    column_names = [desc[0] for desc in cursor.description]

    connection.close()

    return data