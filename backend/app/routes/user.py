from flask_restx import Namespace, Resource, fields, reqparse
from app import db, bcrypt
from app.models.user import User


user_ns = Namespace('users', description='User operations')

register_model = user_ns.model('RegisterUser', {
    'username': fields.String(required=True),
    'password': fields.String(required=True),
    'password_confirmed': fields.String(required=True), #so it asks the user to confirm their password, which is a common practice to prevent typos
    'firstName': fields.String(required=True),
    'lastName': fields.String(required=True),
    'email': fields.String(required=True),
    'phone': fields.String(required=True)
})

login_model = user_ns.model('LoginUser', {
    'username': fields.String(required=True),
    'password': fields.String(required=True)
})

@user_ns.route('/register')
class Register(Resource):

    @user_ns.expect(register_model)
    def post(self):

        data = user_ns.payload

        username = (data.get("username") or "").strip()
        email = (data.get("email") or "").strip().lower()

        password = data.get("password") or ""
        password_confirmed = data.get("password_confirmed") or ""

        firstName = (data.get("firstName") or "").strip()
        lastName = (data.get("lastName") or "").strip()
        phone = (data.get("phone") or "").strip()

        if password != password_confirmed:
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

        # Hash the password, but not yet. I want to check if it gets it properly first.
        #hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        # Create the user

        user = User(username=username,
                    #password=hashed_password, #not yet.
                    password=password, #remove later once above is enabled.
                    firstName=firstName,
                    lastName=lastName,
                    email=email,
                    phone=phone
                )