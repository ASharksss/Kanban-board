import React, {useEffect, useMemo, useState} from 'react';
import './Deal.css'
import {useDispatch, useSelector} from "react-redux";
import {requestDeleteTask, requestFinishTask, requestGetTask, requestGetTaskDocument} from "../../actions/task";
import {isEmpty} from "../utils";
import Loader from "../loader/loader";


function Deal() {
    const [address, setAddress] = useState('')
    const dispatch = useDispatch()
    const {objective} = useSelector(state => state.task)

    useEffect(() => {
        const id = window.location.pathname.split('/deal/')[1]
        dispatch(requestGetTask(id))
    }, [])

    function handleAlert(type) {
        const confirm = prompt('Введите "ФИО" пользователя')
        if (confirm) {
            if (confirm == objective.task.user.fio) {
                if (type == 'отменить') {
                    dispatch(requestDeleteTask(objective.task.id))
                } else if (type == 'завершить') {
                    dispatch(requestFinishTask(objective.task.id))
                }
            } else {
                alert('Не совпадает с ФИО сотрудника')
            }
        } else {
            alert('Поле не должно быть пустым!')
        }
    }

    if (isEmpty(objective)) {
        return <Loader/>
    } else {
        return (
            <div className="main_d">
                <div className="D_container">
                    <div className="deal_header">
                        <h1>Сделка №{objective.task.id}</h1>
                        <button className="print"
                                onClick={() => dispatch(requestGetTaskDocument(objective.task.id))}>Договор
                        </button>
                    </div>
                    <div className="deal_body">
                        <div className="d_row">
                            <input value={objective.task.product.name} type="text" placeholder="Вид изделия"
                                   disabled/>
                            <input value={objective.task.client.fio} type="text" placeholder="Клиент" disabled/>
                            <input value={address} type="text" placeholder="Адрес" disabled/>
                        </div>
                        <div className="dd_row">
                            <input value={objective.task.product.cost} type="text" placeholder="Стоимость"
                                   disabled/>
                            <input value={objective.task.user.fio} type="text" placeholder="Сотрудник"
                                   disabled/>
                        </div>
                        <div className="d_buttons">
                            {objective.stage.name == "Монтаж" && <button>Завершить</button>}
                            <button onClick={() => handleAlert('отменить')}>Отменить</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Deal