from flask import Flask
import os

def create_app():

    app = Flask(__name__, static_folder="../frontend/build")
    from server.routes.api import api_blueprint
    app.register_blueprint(api_blueprint)
    app.config["IEX_API_KEY"] = os.environ.get("IEX_API_KEY")
    app.host = "localhost"

    return app 