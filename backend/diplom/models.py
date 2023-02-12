from datetime import datetime
from diplom.db import db
from werkzeug.security import check_password_hash, generate_password_hash


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    username = db.Column(db.String(20), nullable=False, unique=True)
    password = db.Column(db.String(128), nullable=False)

    fio = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(100))
    description = db.Column(db.String(500))
    role = db.Column(db.String(20), nullable=False)

    job_title = db.Column(db.String(30))
    department = db.Column(db.String(50))
    disable = db.Column(db.BOOLEAN, default=False)

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    @property
    def as_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'fio': self.fio,
            'email': self.email,
            'role': self.role,
            'job_title': self.job_title,
            'disable': self.disable
        }

    @property
    def as_full_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'fio': self.fio,
            'email': self.email,
            'job_title': self.job_title,
            'department': self.department,
            'description': self.description,
            'role': self.role,
        }


class Client(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fio = db.Column(db.String(150), nullable=False)
    tel_number = db.Column(db.String(30))

    #task_processes = db.relationship('TaskProcess')

    @property
    def as_dict(self):
        return {
            'id': self.id,
            'fio': self.fio,
            'tel_number': self.tel_number
        }


class Stage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    class_name = db.Column(db.String(50), default='')
    first = db.Column(db.BOOLEAN, default=False)

    @property
    def as_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'class_name': self.class_name,
            'first': self.first
        }


class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    attribute = db.Column(db.Text)
    time = db.Column(db.TEXT)
    cost = db.Column(db.String(15))

    @property
    def as_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'attribute': self.attribute,
            'cost': self.cost
        }

    @property
    def as_full_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'attribute': self.attribute,
            'time': self.time,
            'cost': self.cost
        }


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50))
    price = db.Column(db.String(30))
    date = db.Column(db.DateTime)
    address = db.Column(db.String(100))

    status = db.Column(db.Integer, db.ForeignKey('status.id'))
    product = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    client_id = db.Column(db.Integer, db.ForeignKey('client.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    client = db.relationship('Client')
    product_dict = db.relationship('Product')
    user = db.relationship('User')
    status_id = db.relationship('Status')

    @property
    def as_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'price': self.price,
            'address': self.address,
            'date': self.date.strftime('%d/%m/%Y'),
            'status': self.status_id.as_dict,
            'user': self.user.as_dict,
            'client': self.client.as_dict
        }

    @property
    def get_task_dict(self):
        return {
            'id': self.id,
            'date': self.date.strftime('«%d» %m %Y'),
            'status': self.status_id.as_dict,
            'client': self.client.as_dict,
            'user': self.user.as_dict,
            'product': self.product_dict.as_dict,
            'price': self.price,
            'address': self.address
        }

    @property
    def as_notice_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'status': self.status_id.as_dict,
            'date': self.date.strftime('%d/%m/%Y')
        }


class TaskProcess(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    task_id = db.Column(db.Integer, db.ForeignKey('task.id'), nullable=False)
    stage = db.Column(db.Integer, db.ForeignKey('stage.id'), nullable=False)
    start_date = db.Column(db.DateTime)
    update_date = db.Column(db.DateTime)
    end_date = db.Column(db.DateTime)

    task = db.relationship('Task')
    stage_id = db.relationship('Stage')

    @property
    def as_full_dict(self):
        return {
            'id': self.id,
            'task_id': self.task_id,
            'stage': self.stage,
            'start_date': self.start_date.strftime('%d/%m/%Y'),
            'update_date': self.update_date.strftime('%d/%m/%Y'),
            'end_date': self.end_date.strftime('%d/%m/%Y'),
        }

    @property
    def get_task_dict(self):
        return {
            'stage': self.stage_id.as_dict,
            'task': self.task.get_task_dict
        }

    @property
    def as_dict(self):
        return {
            'stage': self.stage,
            'task': self.task.as_dict
        }

    @property
    def as_task_dict(self):
        return self.task.as_dict


class Status(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20))

    @property
    def as_dict(self):
        return {
            'id': self.id,
            'name': self.name
        }


class Notification(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime)
    check = db.Column(db.BOOLEAN, default=False)
    move = db.Column(db.BOOLEAN, default=0)

    user = db.Column(db.Integer, db.ForeignKey('user.id'))
    task = db.Column(db.Integer, db.ForeignKey('task.id'))

    task_dict = db.relationship('Task')
    user_dict = db.relationship('User')

    @property
    def as_dict(self):
        return {
            'id': self.id,
            'date': self.date.strftime('%d/%m/%Y'),
            'task': self.task_dict.as_notice_dict,
            'user': self.user_dict.as_dict,
            'check': self.check,
            'move': self.move
        }


# class UserEvent(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
#     notification_id = db.Column(db.Integer, db.ForeignKey('notification.id'))
#     check = db.Column(db.BOOLEAN, default=False)
#
#     user = db.relationship('User', back_populates='notifications')
#
#     @property
#     def as_dict(self):
#         return {
#             'id': self.id,
#             'user': self.user.as_dict,
#         }
