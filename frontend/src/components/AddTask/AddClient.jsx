import React, {useState} from 'react'
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";

import './styleAdd.css'
import {requestAddClient} from "../../actions/client";


function AddClient() {
    const [fio, setFIO] = useState('')
    const [telNumber, setTelNumber] = useState('')
    const dispatch = useDispatch()
    return (
        <div className="u_container">
            <form action="" className="form" onSubmit={e => {
                e.preventDefault()
                dispatch(requestAddClient(fio, telNumber))
            }}>
                <h1 className="form-title">Добавление клиента</h1>

                <div className="form-group">
                    <input onChange={e => setFIO(e.target.value)} type="username" className="form-input" name="login"
                           placeholder=" "/>
                    <label className="form-label">ФИО</label>
                </div>

                <div className="form-group">
                    <input onChange={e => setTelNumber(e.target.value)} type="telephone" className="form-input"
                           name="login" placeholder=" "/>
                    <label className="form-label">Телефон</label>
                </div>
                <button type="submit" className="form-button">Добавить</button>

                <NavLink to="/">
                    <button type="button" className="form-button">Назад</button>
                </NavLink>
            </form>
        </div>
    )
}

export default AddClient
