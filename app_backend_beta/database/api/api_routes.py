from flask import Blueprint, request
from database.db import *

API_routes = Blueprint("API_routes", __name__)

@API_routes.route('/login', methods=['POST'])
def user_login():
    email = request.json['userEmail']
    
    return login(email)

@API_routes.route('/sign-up', methods=['POST'])
def user_signup():
    id = request.json['userID']
    email = request.json['userEmail']
    role = request.json['userRole']

    return signUp(id, email, role)

@API_routes.route('get-stamps', methods=['POST'])
def get_stamps():
    id = request.json['userID']

    return getStamps(id)