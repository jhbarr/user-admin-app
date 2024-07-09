from flask import Blueprint, request
from database.db import *
from database.api.changeStreamThread import changeStreamThread

API_routes = Blueprint("API_routes", __name__)

"""
********* API ROUTES (HTTP) **********
"""

@API_routes.route('/login', methods=['POST'])
def user_login():
    """
    Handles the user login request.
        If the email does not exist, function returns a message saying so.
        Otherwise the role of the user is returned
    """
    email = request.json['userEmail']

    return login(email)

@API_routes.route('/sign-up', methods=['POST'])
def user_signup():
    """
    Handles the user register request
        If the email is already taken, function returns a message saying so
        Otherwise the role and id of the user are returned
    """

    id = request.json['userID']
    email = request.json['userEmail']
    role = request.json['userRole']

    return signUp(id, email, role)

@API_routes.route('/get-stamps', methods=['POST'])
def get_stamps():
    """
    The number of stamps of the user with the specified ID is returned.
        If no such ID exists, function returns a message saying so. 
    """

    id = request.json['userID']

    return getStamps(id)


"""
*********** WEB SOCKET ROUTES **********
"""

thread_map = {}

def start_change_stream_thread(thread_name, userID, sid, socket_instance):
    collection = db['users']

    if thread_name not in thread_map:
        thread = changeStreamThread(userID, sid, socket_instance, collection)

        thread_map[thread_name] = thread
        thread_map[thread_name].daemon = True
        thread_map[thread_name].start()

        print("Mongo DB change stream activated")
    else:
        print("Mongo DB change stream already active")


def stop_change_stream_thread(thread_name):
    if thread_name not in thread_map:
        print("No thread to stop")
    else:
        thread_map[thread_name].stop()
        thread_map[thread_name].join()
        del thread_map[thread_name]
