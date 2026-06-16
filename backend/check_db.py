from app import create_app, db
from sqlalchemy import inspect

def main():
    app = create_app()
    with app.app_context():
        print('SQLALCHEMY_DATABASE_URI =', str(db.engine.url))
        try:
            insp = inspect(db.engine)
            tables = insp.get_table_names()
            print('Tables:', tables)
        except Exception as e:
            print('Error inspecting engine:', e)

        try:
            res = db.session.execute("SELECT name, sql FROM sqlite_master WHERE type='table';").fetchall()
            print('sqlite_master rows:')
            for row in res:
                print(row)
        except Exception as e:
            print('sqlite_master query failed (likely not SQLite):', e)

if __name__ == '__main__':
    main()
