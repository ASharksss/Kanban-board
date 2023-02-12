from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity

from diplom.db import db
from diplom.models import User, Notification
from diplom.utils import error_dict, success_dict, only_for

bp = Blueprint('v1notice', __name__, url_prefix='/v1/notice')


@bp.route('/', methods=['GET'])
@jwt_required()
@only_for('admin', 'manager')
def notice():
	user = User.query.filter_by(username=get_jwt_identity()['username']).first()
	notice = Notification.query.filter_by(user=user.id).all()
	data, dt = [n.as_dict for n in notice], []
	for item in data:
		if item['check'] is False:
			dt.append(item)
	return success_dict(notice=dt)


@bp.route('/checked/<n_id>', methods=['PUT'])
@jwt_required()
@only_for('admin', 'manager')
def notice_checked(n_id=None):
	notice = Notification.query.get(n_id)
	if notice is None:
		return error_dict('Уведомление не найдено')
	notice.check = True
	db.session.commit()
	return success_dict()
