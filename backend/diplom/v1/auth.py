from datetime import timedelta
from flask import Blueprint, request
from flask_jwt_extended import create_access_token

from diplom.db import db
from diplom.models import User
from diplom.utils import error_dict, success_dict

bp = Blueprint('v1auth', __name__, url_prefix='/v1')


@bp.route('/signin', methods=('POST',))
def signin():
    username = request.json.get('username', None)
    password = request.json.get('password', None)

    if not username or not password:
        return error_dict('Имя пользователя или пароль не может быть пустым')

    user = User.query.filter_by(username=username).first()
    if not user or not user.check_password(password):
        return error_dict('Неверный логин или пароль')
    if user.disable:
        return error_dict('Пользователь заблокирован')

    token = create_access_token(identity={
        'username': username,
        'role': user.role,
        'fio': user.fio,
    }, expires_delta=timedelta(7))

    return success_dict(accessToken=token, role=user.role)
