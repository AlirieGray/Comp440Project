from flask_restx import Namespace, Resource, fields, reqparse
from app import db, bcrypt
from app.models.user import User
from flask import request

# This file defines the API endpoints related to user operations, 
# such as registration and login. It uses Flask-RESTX to create a namespace 
# for user routes and defines request parsers and response models for Swagger documentation.
user_ns = Namespace('users', description='User operations')

# Define request parsers for form-based input
register_model = user_ns.model('RegisterUser', {
    'username': fields.String(required=True, example='test123'),
    'password': fields.String(required=True, example='password123'),
    'passwordConfirmed': fields.String(required=True, example='password123'), #so it asks the user to confirm their password, which is a common practice to prevent typos
    'firstName': fields.String(required=True, example='John'),
    'lastName': fields.String(required=True, example='Doe'),
    'email': fields.String(required=True, example='johndoe@example.com'),
    'phone': fields.String(required=True, example='1234567890')
})

@user_ns.route('/register')
class Register(Resource):

    # Example request body for registration:
    # {
    # "username": "testuser",
    # "password": "password123",
    # "passwordConfirmed": "password123",
    # "firstName": "Test",
    # "lastName": "User",
    # "email": "test@example.com",
    # "phone": "5551234567"
    # }

    @user_ns.expect(register_model)
    def post(self):

        data = user_ns.payload
        #data = request.get_json() or {} #This is an alternative to the above line, but I think the above should also work with the newer version of flask-restx.

        username = (data.get("username") or "").strip()
        email = (data.get("email") or "").strip().lower()

        password = data.get("password") or ""
        passwordConfirmed = data.get("password_confirmed") or ""
        #no stripping for passwords, since spaces could be valid characters in passwords.


        firstName = (data.get("firstName") or "").strip()
        lastName = (data.get("lastName") or "").strip()
        phone = (data.get("phone") or "").strip()

        if not all([username, email, password, passwordConfirmed, firstName, lastName, phone]): #if any of the required fields are missing or empty, return a 400 error with a message indicating that all fields are required.
            user_ns.abort(400, "All fields are required")

        if password != passwordConfirmed:
            user_ns.abort(400, "Passwords do not match")

        # Check duplicate username
        if User.query.filter_by(username=username).first():
            user_ns.abort(400, "Username already exists")

        # Check duplicate email
        if User.query.filter_by(email=email).first():
            user_ns.abort(400, "Email already exists")

        # Check duplicate phone
        if User.query.filter_by(phone=phone).first():
            user_ns.abort(400, "Phone already exists")

        # #Hash the password, but not yet. I want to check if it gets it properly stored first.
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        # Create the user

        user = User(username=username,
                    password=hashed_password, #not yet.
                    #password=password, #remove later once above is enabled.
                    firstName=firstName,
                    lastName=lastName,
                    email=email,
                    phone=phone
                )
        db.session.add(user)
        db.session.commit()
        return {
            "message": "User registered successfully",
            "username": username
        }, 201
    
# The endpoint to get all users, for testing purposes. Do not implement in front end.
user_response = user_ns.model('UserResponse', {
    'username': fields.String(description='Unique username',example='Jdoe123'),
    'firstName': fields.String(description='First name',example='John'),
    'lastName': fields.String(description='Last name',example='Doe'),
    #'password': fields.String(description='password',example='password123'), #Unhashed for testing, change to below latter.
    'password': fields.String(description='Hashed password',example='$2b$12$KIXQJHj1Z5e5s5s5s5s5u5u5u5u5u5u5u5u5u5u5u5u5u'), 
    'email': fields.String(description='Email address',example='johndoe@example.com'),
    'phone': fields.String(description='Phone number',example='1234567890')
})

@user_ns.route('/')
class UserList(Resource):

    @user_ns.marshal_list_with(user_response)
    def get(self):
        """Get all users"""
        return User.query.all()
    
# The login endpoint  
login_model = user_ns.model('LoginUser', {
    'username': fields.String(required=True, example='test123'), #usernames are case-sentitive.
    'password': fields.String(required=True, example='password123')
})

@user_ns.route('/login')
class Login(Resource):

    @user_ns.expect(login_model)
    def post(self):

        data = user_ns.payload

        username = (data.get("username") or "").strip()
        password = data.get("password") or ""

        if not username or not password:
            user_ns.abort(400, "Username and password are required")

        user = User.query.filter_by(username=username).first()

        if not user:
            user_ns.abort(401, "Invalid username or password")

        # Temporary plaintext comparison
        #if user.password != password:
            #user_ns.abort(401, "Invalid username or password")

        # Future implementation with hashed passwords:
        if not bcrypt.check_password_hash(user.password, password):
            user_ns.abort(401, "Invalid username or password")

        return {
            "message": "Login successful",
            "username": user.username,
            "firstName": user.firstName,
            "lastName": user.lastName, 
            "email": user.email,
            "phone": user.phone
        }, 200