from flask import Flask, session, Response, request
from flask_cors import CORS
from flask_socketio import SocketIO, emit
import os
from database.api.api_routes import API_routes, start_change_stream_thread, stop_change_stream_thread

# Creates the basic flask app and registers the valid route blueprints
# Then runs the app
app = Flask(__name__)
app.secret_key = os.urandom(12)
app.config['DEBUG'] = True

app.register_blueprint(API_routes)

CORS(app,resources={r"/*":{"origins":"*"}})
socketio = SocketIO(app,cors_allowed_origins="*")

# Default route
# Will catch any errant requests
@app.route('/', defaults={'path' : ''})
@app.route('/<path:path>')
def catch_all(path):
        return "Incorrect API route"

"""
********* WEB SOCKET ROUTES (WS) ************
"""
@socketio.on("connect")
def connected():
    """
    # Event listener to check when the user has connected to the socket
    """
    print("client has connected")

@socketio.on("start-thread")
def start_thread(data):
    """
    Starts a database change stream thread for the current user
        data: {"userID" : id}
    """

    userID = data['userID']
    sid = request.sid
    
    # This function actually starts the change stream thread
    start_change_stream_thread(userID, sid, socketio)

@socketio.on("disconnect")
def disconnected():
    """
    Even listener to check when the user has disconnected from the socket
    """
    print("user disconnected")

    # This function closes the change stream thread for the user 
    stop_change_stream_thread(request.sid)

   

if __name__ == "__main__":
    # Start the app using Socket IO
    # To run on local host - temporarily delete the "host"
    socketio.run(app, debug=True, port=5001, host="0.0.0.0")