from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS

from diplom.v1 import auth, task, admin, client, profile, notification, user
from diplom.models import *
from diplom.db import db, migrate
from diplom.v1.error_handlers import base_handler


def create_app():
    app = Flask(__name__)

    app.config.from_pyfile('config.py')

    db.init_app(app)
    migrate.init_app(app, db)

    app.register_blueprint(auth.bp)
    app.register_blueprint(admin.bp)
    app.register_blueprint(user.bp)
    app.register_blueprint(task.bp)
    app.register_blueprint(client.bp)
    app.register_blueprint(profile.bp)
    app.register_blueprint(notification.bp)

    app.register_error_handler(Exception, base_handler)

    JWTManager(app)
    CORS(app, support_credentials=True)

    @app.route('/')
    def index():
        return 'close it until you regretted. i\'m not jokin.'

    return app
