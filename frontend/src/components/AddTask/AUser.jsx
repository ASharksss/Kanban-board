import React from 'react'
import {NavLink} from "react-router-dom";
import './styleAdd.css'



function AUser(){
    return(
        <div className="u_container">
            <form action="" className="form">
                <h1 className="form-title">Добавление пользователя</h1>

                <div className="form-group">
                    <input type="username" className="form-input" name="login" placeholder=" "/>
                    <label className="form-label">ФИО</label>
                </div>

                <div className="form-group">
                    <input type="username" className="form-input" name="login" placeholder=" "/>
                    <label className="form-label">Логин</label>
                </div>

                <div className="form-group">
                    <input type="username" className="form-input" name="login" placeholder=" "/>
                    <label className="form-label">Пароль</label>
                </div>

                <div className="form-group">
                    <input type="text" className="form-input" name="login" placeholder=" "/>
                    <label className="form-label">Должность</label>
                </div>

                <button type="submit" className="form-button">Добавить</button>

                <NavLink to="/">
                    <button type="submit" className="form-button">Назад</button>
                </NavLink>

            </form>
        </div>
    )
}

export default AUser
