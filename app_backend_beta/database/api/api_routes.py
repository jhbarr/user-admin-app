from flask import Blueprint, request
from database.db import *
from database.api.changeStreamThread import changeStreamThread

API_routes = Blueprint("API_routes", __name__)

"""
********* API ROUTES (HTTP) **********
"""

@API_routes.route('/test', methods=['POST'])
def test():
    return {"message" : "success"}

@API_routes.route('/login', methods=['POST'])
def user_login():
    """
    user_login() -> {'email' : String, 'role' : String, 'id' : String}

    Handles the user login request.
        If the email does not exist, function returns a message saying so.
        Otherwise the role of the user is returned
    
    Inputs:
        email (String) : The email of the user that made the login request
    """
    email = request.json['userEmail']

    # Call login function from database.db
    return login(email)

@API_routes.route('/sign-up', methods=['POST'])
def user_signup():
    """
    user_signup() -> {'role' : String, 'id' : String}

    Handles the user register request
        If the email is already taken, function returns a message saying so
        Otherwise the role and id of the user are returned
    
    Inputs:
        userID (String) : The firebase / Mongo DB id of the user that made the request
        email (String) : The email of the user
        role (String) : The role of the current user within the application
    """

    id = request.json['userID']
    email = request.json['userEmail']
    role = request.json['userRole']

    # Call signUp function from database.db
    return signUp(id, email, role)

@API_routes.route('/get-stamps', methods=['POST'])
def get_stamps():
    """
    The number of stamps of the user with the specified ID is returned.
    If no such ID exists, function returns a message saying so. 

    Inputs:
        email (String) : The email of the user that made the request
    """
    id = request.json['userID']

    # Call getStamps function from database.db
    return getStamps(id)


@API_routes.route('/set-stamps', methods=['POST'])
def set_stamps():
    id = request.json['userID']
    stamp_increase = request.json['stampIncrease']

    # Call setStamps function from databse.db
    return setStamps(id, stamp_increase)


"""
*********** WEB SOCKET METHODS (WS) **********
"""

# Dictionary to keep track of all of the active change stream threads
thread_map = {}

def start_change_stream_thread(userID, sid, socket_instance):
    """
    This function instantiates a new changeStreamThread class for the user and begins that thread
    so that they can be updated regarding any changes to their stamp total

    Inputs:
        userID (String) : The Mongo DB _id of the user
        sid (String) : The socket SID of the user
        socket_instance (Socket IO) : the socket instance within the main app
    """

    # current working db imported from database.db
    collection = db['users']
    thread_name = "thread " + sid

    # Check if the user is already running a change stream thread
    if thread_name not in thread_map:
        # Create a new change stream thread instance 
        thread = changeStreamThread(userID, sid, socket_instance, collection)
        
        # Add that instance to the dictionary and start it
        thread_map[thread_name] = thread
        thread_map[thread_name].daemon = True
        thread_map[thread_name].start()

        print("Mongo DB change stream activated")
    else:
        print("Mongo DB change stream already active")


def stop_change_stream_thread(sid):
    """
    This function stops the change stream thread of the user with the associated socket SID

    Inputs:
        sid (String) : The socket SID of the user
    """
    thread_name = "thread " + sid

    # Check if a thread with that SID actually exists
    if thread_name not in thread_map:
        print("No thread to stop")
    else:
        # Close and delete the thread
        thread_map[thread_name].stop()
        thread_map[thread_name].join()
        del thread_map[thread_name]
