from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv
from flask_cors import CORS
import os

load_dotenv()

db = SQLAlchemy()
bcrypt = Bcrypt()

def create_app():
    app = Flask(__name__)

    CORS(app) # Enable CORS for all routes and origins, allowing the frontend to communicate with the backend without CORS issues.

    # Initialize Flask-RESTX for API documentation and routing
    from flask_restx import Api
    api = Api(app, version='1.0', title='Comp440Project API',
              description='User registration and login system')
    
    # Register the users namespace from routes package
    try:
        import importlib
        routes_pkg = importlib.import_module('app.routes')
        if hasattr(routes_pkg, 'user_ns'):
            api.add_namespace(routes_pkg.user_ns, path='/api/users')

        if hasattr(routes_pkg, 'item_ns'):
            api.add_namespace(routes_pkg.item_ns, path='/api/items')
            
    except Exception as e:
        print(f'Warning: Could not load routes namespace: {e}')

    # Prefer an explicit DATABASE_URL, otherwise support MySQL env vars, fall back to SQLite
    database_url = os.getenv('DATABASE_URL')
    if not database_url:
        mysql_user = os.getenv('MYSQL_USER')
        mysql_password = os.getenv('MYSQL_PASSWORD')
        mysql_host = os.getenv('MYSQL_HOST', 'localhost')
        mysql_db = os.getenv('MYSQL_DB')
        if mysql_user and mysql_password and mysql_db:
            database_url = f"mysql+pymysql://{mysql_user}:{mysql_password}@{mysql_host}/{mysql_db}"
        else:
            database_url = os.getenv('SQLITE_PATH', 'sqlite:///app.db') #Sqlite fallback, since Im yet to set up the MySQL database.

    app.config['SQLALCHEMY_DATABASE_URI'] = database_url
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    bcrypt.init_app(app)

    # Import models so they are registered with SQLAlchemy before creating tables
    try:
        import importlib
        importlib.import_module('app.models')
    except Exception:
        pass

    with app.app_context():
        db.create_all()

    return app
