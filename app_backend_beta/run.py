from flask import Flask, session, Response
import os
from database.api.api_routes import API_routes

def create_app():
    """
    Creates the basic flask app and registers the valid route blueprints
    Then runs the app
    """
    app = Flask(__name__)
    app.secret_key = os.urandom(12)
    app.config['DEBUG'] = True

    app.register_blueprint(API_routes)

    # Default route
    # Will catch any errant requests
    @app.route('/', defaults={'path' : ''})
    @app.route('/<path:path>')
    def catch_all(path):
        return "Incorrect API route"

    app.run(debug=True)

if __name__ == "__main__":
    create_app()