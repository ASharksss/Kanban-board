from flask import Blueprint, request
from flask_jwt_extended import jwt_required

from diplom.db import db
from diplom.models import User, Client
from diplom.utils import error_dict, success_dict, only_for

bp = Blueprint('v1client', __name__, url_prefix='/v1/client')


@bp.route('/all', methods=['GET'])
@jwt_required()
@only_for('admin', 'manager')
def all_clients():
	clients = Client.query.all()
	return success_dict(clients=[c.as_dict for c in clients])


@bp.route('/add', methods=['POST'])
@jwt_required()
@only_for('admin', 'manager')
def add_client():
	fio = request.json.get('fio', None)
	tel_number = request.json.get('tel_number', None)
	client = Client(
		fio=fio,
		tel_number=tel_number
	)
	db.session.add(client)
	db.session.commit()
	return success_dict()
