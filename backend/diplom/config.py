import os

basedir = os.path.abspath(os.path.dirname(__file__))

SECRET_KEY = 'PASTEHERERANDOMSTRING'
JWT_SECRET_KEY = 'PASTEHERERANDOMSTRINGTOO'

SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir) + '/database.sqlite3'
SQLALCHEMY_TRACK_MODIFICATIONS = False
