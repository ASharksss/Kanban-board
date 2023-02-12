from flask import Blueprint, request
from flask_jwt_extended import jwt_required

from diplom.db import db
from diplom.models import User
from diplom.utils import success_dict, only_for, error_dict

bp = Blueprint('v1admin', __name__, url_prefix='/v1/admin')


@bp.route('/add/user', methods=['POST'])
@jwt_required()
@only_for('admin')
def add_user():
	username = request.json.get('username', None)
	password = request.json.get('password', None)
	fio = request.json.get('fio', None)
	job_title = request.json.get('job_title', None)

	user = User.query.filter_by(username=username).first()

	if user:
		return error_dict('Такой пользователь уже существует')
	if password is None or username is None or fio is None or job_title is None:
		return error_dict('Поля не должны быть пустыми!')

	user = User(
		username=username,
		fio=fio,
		job_title=job_title,
		role="manager"
	)
	user.set_password(password)
	db.session.add(user)
	db.session.commit()
	return success_dict()
