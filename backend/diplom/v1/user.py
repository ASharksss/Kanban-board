from flask import Blueprint, request
from flask_jwt_extended import jwt_required

from diplom.db import db
from diplom.models import Client, User
from diplom.utils import success_dict, only_for, error_dict

bp = Blueprint('v1user', __name__, url_prefix='/v1/user')


@bp.route('/add/client', methods=['POST'])
@jwt_required()
@only_for('admin')
def add_client():
    fio = request.json.get('fio', None)
    tel_number = request.json.get('tel_number', None)
    client = Client(fio=fio, tel_number=tel_number)
    db.session.add(client)
    db.session.commit()
    return success_dict(message='Клиент добавлен', client=client.as_dict)


@bp.route('/disable/<u_id>', methods=['DELETE'])
@jwt_required()
@only_for('admin')
def disable_user(u_id=None):
    user = User.query.get(u_id)
    if user is None:
        return error_dict('Пользователь не найден')
    user.disable = True
    db.session.commit()
    return success_dict(message='Пользователь заблокирован')


@bp.route('/enable/<u_id>', methods=['DELETE'])
@jwt_required()
@only_for('admin')
def enable_user(u_id=None):
    user = User.query.get(u_id)
    if user is None:
        return error_dict('Пользователь не найден')
    user.disable = False
    db.session.commit()
    return success_dict(message='Пользователь разблокирован')


@bp.route('/all', methods=['GET'])
@jwt_required()
@only_for('admin')
def all_users():
    users = User.query.all()
    return success_dict(users=[u.as_dict for u in users])


@bp.route('/clients', methods=['GET'])
@jwt_required()
def all_clients():
    clients = Client.query.all()
    return success_dict(clients=[c.as_dict for c in clients])


@bp.route('/client/<c_id>', methods=['DELETE'])
@jwt_required()
@only_for('admin')
def delete_clients(c_id=None):
    client = Client.query.get(c_id)
    if client is None:
        return error_dict('Этот клиент не найден')
    if len(client.task_processes) > 0:
        return error_dict('Невозможно удалить, имеются сделки')
    db.session.delete(client)
    db.session.commit()
    return success_dict(message='Клиент удален')
