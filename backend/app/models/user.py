from app import db
from datetime import datetime, timezone

#(5 pts) Create a database schema and implement a user registration and login interface so only
#a registered user can login into the system. The schema of the user table should be:
#user(username, password, firstName, lastName, email, phone)
#username is the primary key, and email/phone should be unique. You have to prevent the SQL
#injection attack. There is an attached pdf file about SQL injection attacks. In addition, create
#hashed passwords. 

class User(db.Model):
    __tablename__ = 'user'
    username = db.Column(db.String(80), primary_key=True)
    password = db.Column(db.String(200), nullable=False)
    firstName = db.Column(db.String(80), nullable=False)
    lastName = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(20), unique=True, nullable=False)
