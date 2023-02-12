from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity

from diplom.db import db
from diplom.models import User, Client
from diplom.utils import error_dict, success_dict, only_for

bp = Blueprint('v1profile', __name__, url_prefix='/v1/profile')


@bp.route('/', methods=['GET'])
@jwt_required()
@only_for('admin', 'manager')
def profile():
    user = User.query.filter_by(username=get_jwt_identity()['username']).first()
    return success_dict(user=user.as_dict)
