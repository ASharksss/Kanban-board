import React, {useCallback, useEffect, useState} from 'react'
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import './styleAdd.css'
import {requestAllClients} from "../../actions/client";
import {requestAddTask} from "../../actions/task";

function AddTask() {
    const dispatch = useDispatch()

    const [title, setTitle] = useState('')
    const [clientID, setClient] = useState(0)
    const [date, setDate] = useState(null)
    const [product, setProduct] = useState(0)
    const [address, setAddress] = useState('')

    const {client} = useSelector(state => state.client)

    useEffect(() => {
        dispatch(requestAllClients())
    }, [])

    return (
        <div className="a_container">
            <form className="form" onSubmit={e => {
                e.preventDefault()
                dispatch(requestAddTask(title, product, date, clientID))
            }}>
                <h1 className="form-title"> Оформление заказа</h1>

                <div className="form-group">
                    <input onChange={e => setTitle(e.target.value)} type="username" className="form-input" name="login"
                           placeholder=" "/>
                    <label className="form-label">Наименование заказа</label>
                </div>

                <div className="form-group">
                    <select onChange={e => setClient(e.target.value)} name="" id="" className="form-input">
                        <option value="" selected disabled hidden>Выберите клиента</option>
                        {client.map(item => {
                            return (
                                <option key={item.id} value={item.id}>{item.fio}</option>
                            )
                        })}
                    </select>
                </div>

                <div className="form-group">
                    <select onChange={e => setProduct(e.target.value)} name="" id="" className="form-input">
                        <option value="" selected disabled hidden>Выберите вид изделия</option>
                        <option value="1">Шкаф</option>
                        <option value="1">Стол</option>
                    </select>
                </div>

                <div className="form-group">
                    <input onChange={e => setAddress(e.target.value)} value={address} type="text" className="form-input"
                           name="password" maxLength="8" placeholder=" "/>
                    <label className="form-label">Адрес</label>
                </div>

                <div className="form-group">
                    <input value={product == 1 ? "2500" : ""} type="text" className="form-input" placeholder=" "/>
                    <label className="form-label">Стоимость</label>
                </div>

                <div className="form-group">
                    <input onChange={e => setDate(e.target.value)} type="date" className="form-input" name="password"
                           maxLength="8" placeholder=" "/>
                    <label className="form-label">Дата оформления</label>
                </div>

                <div className="form-group">
                    <input type="date" className="form-input" name="password" maxLength="8" placeholder=" "/>
                    <label className="form-label">Дата окончания</label>
                </div>

                <button type="submit" className="form-button">Добавить</button>

                <NavLink to="/">
                    <button type="button" className="form-button">Назад</button>
                </NavLink>

            </form>
        </div>
    )
}

export default AddTask