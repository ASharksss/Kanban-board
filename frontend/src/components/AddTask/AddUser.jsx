import React, {useState} from 'react'
import {NavLink} from "react-router-dom";
import './styleAdd.css'
import {useDispatch} from "react-redux";
import {requestAddUser} from "../../actions/user";


function AddUser() {
    const [fio, setFIO] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [jobTitle, setJobTitle] = useState('')
    const dispatch = useDispatch()

    return (
        <div className="u_container">
            <form className="form" onSubmit={e => {
                e.preventDefault()
                dispatch(requestAddUser(fio, username, password, jobTitle))
            }}>
                <h1 className="form-title">Добавление пользователя</h1>
                <div className="form-group">
                    <input onChange={e => setFIO(e.target.value)} type="username" className="form-input"
                           placeholder=" "/>
                    <label className="form-label">ФИО</label>
                </div>
                <div className="form-group">
                    <input onChange={e => setUsername(e.target.value)} type="username" className="form-input"
                           placeholder=" "/>
                    <label className="form-label">Логин</label>
                </div>
                <div className="form-group">
                    <input onChange={e => setPassword(e.target.value)} type="text" className="form-input"
                           placeholder=" "/>
                    <label className="form-label">Пароль</label>
                </div>
                <div className="form-group">
                    <input onChange={e => setJobTitle(e.target.value)} type="text" className="form-input"
                           placeholder=" "/>
                    <label className="form-label">Должность</label>
                </div>
                <button type="submit" className="form-button">Добавить</button>
                <NavLink to="/">
                    <button type="button" className="form-button">Назад</button>
                </NavLink>
            </form>
        </div>
    )
}

export default AddUser
