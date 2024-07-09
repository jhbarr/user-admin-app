from flask import Flask, session, Response, request
from flask_cors import CORS
from flask_socketio import SocketIO, emit
import os
from database.api.api_routes import API_routes, start_change_stream_thread, stop_change_stream_thread

"""
Creates the basic flask app and registers the valid route blueprints
Then runs the app
"""
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

@socketio.on("connect")
def connected():
    """event listener when client connects to the server"""
    print("client has connected")

@socketio.on("start-thread")
def start_thread(data):
    """
    Starts a change stream thread with the sid of the current user
    """
    userID = data['userID']
    sid = request.sid
    thread_name = "thread " + sid
    
    start_change_stream_thread(thread_name, userID, sid, socketio)

@socketio.on("disconnect")
def disconnected():
    """event listener when client disconnects to the server"""
    print("user disconnected")

    thread_name = "Thread " + request.sid
    stop_change_stream_thread(thread_name)

   
if __name__ == "__main__":
    #app.run(debug=True)
    socketio.run(app, debug=True)