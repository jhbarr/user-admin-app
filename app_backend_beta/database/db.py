from flask import abort, session
from werkzeug.local import LocalProxy
from pymongo import MongoClient
import certifi

def get_db():
    """
    get_db() -> MongoDB database

    Connects to the necessary MongoDB cluster and returns the journalling database 
    within said cluster
    """

    cluster = MongoClient('mongodb+srv://joheba77:Jojihen27@cluster0.lwskgph.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', tlsCAFile=certifi.where())  
    return cluster['admin-user-app']

# Use LocalProxy to read the global db instance with just `db`
db = LocalProxy(get_db)


"""
******** USER METHODS *******
"""

def signUp(id, email,role):
    """
    signup() -> role (String)

    Inputs:
        id (Firebase object id) : The firebase id of the person registering
        email (String) : The email of the person registering
        role (String) : The role of the perosn registering
    
    This will create a new user in the database and define their role (either a User or an Admin)
    """

    collection = db['users']
    # Create user object
    user = {
        "_id" : id,
        "email" : email,
        "role" : role,
        "stamps": 0,
    }

    taken_user = collection.find_one({"email" : email})

    # Check to see whether the email has been taken already
    if taken_user:
        return {"Error" : "Email already exists"}, 409
    
    # Insert the user into the users collection
    if collection.insert_one(user):
        return {"role" : user['role'], "id": user['_id']}
    
    # Return an error if the user could not be successfully added to the database
    return {"Error" : "user could not be added"}



def login(email):
    """
    login() -> role (String)

    Inputs:
        email (String): The email of the user logging in

    This will set the current session's userID to the ID of the user that is logging in.
    So that their entries can be quickly accessed. 
    """

    collection  = db['users']
    user = collection.find_one({
        "email" : email
    })

    if user:
        return {"email": user['email'], "role": user['role'], "id": user['_id']}

    # Return an error if login credentials cannot be found in the database
    return {"Error" : "invalid login credentials"}, 401


"""
********* DATABASE QUERY METHODS **********
"""

def getStamps(id):
    collection = db['users']

    # Query the database to find the user with the associated ID
    user = collection.find_one({"_id": id})

    # Check if the query returned any valid results
    if user:
        return {"stamps": user['stamps']}
     
    # Return an error if no such user exists
    return {"Error": "Invalid user"}



"""
******* CHANGE STREAM THREAD METHODS **********
"""

