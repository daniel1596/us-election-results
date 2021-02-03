from pathlib import Path
from sqlite3.dbapi2 import connect
from typing import List, Tuple


db_location = Path(__file__).parent.parent.parent / "data/presidential-election-voting-patterns.sqlite"


"""
It would be nice to use a context manager here if I could, but I'm not entirely sure the best way to do that
but it would be good to avoid repeatable code if I refactor
"""


def execute(sql: str, params: Tuple = None):
    connection = connect(db_location)
    connection.execute(sql) if not params \
        else connection.execute(sql, params)

    connection.commit()
    connection.close()


def execute_many(sql: str, items: List):
    """Use the connection.executemany() method to bulk insert items at once."""
    connection = connect(db_location)
    connection.executemany(sql, items)

    connection.commit()
    connection.close()


def select_single_row(sql: str, params: Tuple):
    """The params are required to filter the results here"""
    connection = connect(db_location)
    cursor = connection.execute(sql, params)
    row = cursor.fetchone()

    connection.close()

    return row


def select_single_value(sql: str, params: Tuple):
    return select_single_row(sql, params)[0]
