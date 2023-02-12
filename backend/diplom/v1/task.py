import docx
from datetime import datetime
from flask import Blueprint, request, send_from_directory, send_file, send_from_directory
from flask_jwt_extended import get_jwt_identity, jwt_required

from diplom.db import db
from diplom.models import User, Task, Client, Product, Notification, TaskProcess, Stage
from diplom.utils import error_dict, success_dict, only_for, docx_replace, dirname

bp = Blueprint('v1task', __name__, url_prefix='/v1')


@bp.route('/task/add', methods=('POST', 'GET'))
@jwt_required()
@only_for('admin', 'manager')
def add_task():
    if request.method == 'POST':
        title = request.json.get('title', None)
        my_date = request.json.get('date', None)
        product = request.json.get('product', None)
        client_id = request.json.get('client', None)
        if not Product.query.get(int(product)):
            return error_dict('Продукт не найден!')
        if not Client.query.get(int(client_id)):
            return error_dict('Клиент не найден!')
        if my_date is None:
            return error_dict('Не выставлена дата!')
        my_date = my_date.split('-')
        y, m, d = my_date[0], my_date[1], my_date[2]
        user = User.query.filter_by(username=get_jwt_identity()['username']).first()
        task = Task(
            title=title,
            date=datetime(int(y), int(m), int(d)),
            product=int(product),
            client_id=int(client_id),
            user_id=user.id,
            status=1
        )
        db.session.add(task)
        db.session.commit()
        task_process = TaskProcess(
            task_id=task.id,
            stage=1,
            start_date=datetime(int(y), int(m), int(d))
        )
        notice = Notification(
            date=datetime(int(y), int(m), int(d)),
            user=user.id,
            task=task.id,
            move=0
        )
        db.session.add(task_process)
        db.session.add(notice)
        db.session.commit()
        return success_dict(message='Таск создан')
    elif request.method == 'GET':
        client = Client.query.all()
        product = Product.query.all()
        return success_dict(client=[c.as_dict for c in client], product=[p.as_dict for p in product])


@bp.route('/', methods=['GET'])
@jwt_required('Authorization')
def all_task():
    tasks = TaskProcess.query.all()
    data, dt_task = [
                        {'id': 1, 'title': 'Обработка заявки', 'class_name': 'column first', 'first': True,
                         'items': []},
                        {'id': 2, 'title': 'Проектирование', 'class_name': 'column second', 'first': False,
                         'items': []},
                        {'id': 3, 'title': 'Снабжение', 'class_name': 'column third', 'first': False, 'items': []},
                        {'id': 4, 'title': 'Производство', 'class_name': 'column', 'first': False, 'items': []},
                        {'id': 5, 'title': 'Монтаж', 'class_name': 'column', 'first': False, 'items': []}
                    ], []

    for t in tasks:
        dt_task.append(t.as_dict)

    for t in dt_task:
        for d in data:
            if t['task']['status']['id'] != 3 and t['task']['status']['id'] != 2:
                if t['stage'] == d['id']:
                    d['items'].append(t['task'])
        del t['stage']

    return success_dict(board=data)


@bp.route('/task/<t_id>', methods=['PUT'])
@jwt_required()
@only_for('admin', 'manager')
def update_task(t_id=None):
    task = Task.query.get(t_id)
    if task is None:
        return error_dict('Задача не найдена')
    title = request.json.get('title', None)
    address = request.json.get('address', None)
    status = request.json.get('status', None)
    if title is None and address is None:
        return error_dict('Поля для изменения пустые!')
    if title is not None:
        task.title = title
    if address is not None:
        task.address = address
    if status is not None:
        task.status = status
    db.session.commit()
    return success_dict(tasks=[t.as_dict for t in task])


@bp.route('/task/<t_id>', methods=['DELETE'])
@jwt_required()
@only_for('admin', 'manager')
def delete_task(t_id=None):
    task = Task.query.get(t_id)
    if task is None:
        return error_dict('Задача не найдена')
    task.status = 2
    db.session.commit()
    return success_dict(message="Задача перенесена в архив")


@bp.route('/task/<t_id>', methods=['GET'])
@jwt_required()
@only_for('admin', 'manager')
def get_task(t_id=None):
    task = TaskProcess.query.filter_by(task_id=t_id).first()
    if task is None:
        return error_dict('Задача не найдена')
    return success_dict(task=task.get_task_dict)


@bp.route('/task/finish/<t_id>', methods=['PUT'])
@jwt_required()
@only_for('admin', 'manager')
def finish_task(t_id=None):
    task = Task.query.get(t_id)
    if task is None:
        return error_dict('Задача не найдена')
    task.status = 3
    db.session.commit()
    return success_dict(message="Задача завершена")


@bp.route('/task/document/<t_id>', methods=['GET'])
@jwt_required()
@only_for('admin', 'manager')
def get_task_document(t_id=None):
    task = TaskProcess.query.filter_by(task_id=t_id).first().get_task_dict
    if task is None:
        return error_dict('Задача не найдена')
    from_filename = dirname + '\\sample.docx'
    filename = "Заказ №" + str(t_id) + " " + str(task['task']['client']['fio'])
    to_filename = dirname + '\\documents\\' + filename + '.docx'
    REPLACING = {
        'date': task['task']['date'],
        'client_fio': task['task']['client']['fio'],
        'product_name': task['task']['product']['name'],
        'task_address': task['task']['address'],
        'task_price': task['task']['price']
    }
    doc = docx.Document(from_filename)
    docx_replace(doc, REPLACING)
    doc.save(to_filename)
    # return send_file(to_filename)
    return success_dict(message='Документ сформирован')


@bp.route('/task/<t_id>/stage/<s_id>', methods=['PUT'])
@jwt_required()
@only_for('admin', 'manager')
def dnd(t_id=None, s_id=None):
    user = User.query.filter_by(username=get_jwt_identity()['username']).first()
    task_procc = TaskProcess.query.filter_by(task_id=t_id).first()
    task_procc.stage = s_id
    notice = Notification(
        date=datetime.now(),
        user=user.id,
        task=t_id,
        move=1
    )
    db.session.add(notice)
    db.session.commit()
    return success_dict(message='Success')


@bp.route('/archive', methods=['GET'])
@jwt_required()
@only_for('admin', 'manager')
def archive():
    tasks = TaskProcess.query.all()
    dt_task, archive = [t.as_dict for t in tasks], []
    for t in dt_task:
        if t['task']['status']['id'] == 3 or t['task']['status']['id'] == 2:
            archive.append(t['task'])
    return success_dict(data=archive)

