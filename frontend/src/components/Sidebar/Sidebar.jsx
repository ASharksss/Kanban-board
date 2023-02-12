import React from 'react'
import {NavLink, Redirect} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import './sidebar.css'
import {logout} from "../../reducers/authReducer";


function Sidebar(){
    const role = useSelector(state => state.auth.role)
    const dispatch = useDispatch()
    function handlerLogout() {
        dispatch(logout())
        // return <Redirect to="" />
    }
    return(
        <div className="hamburger-menu">
            <input id="menu__toggle" type="checkbox"/>
            <label className="menu__btn" htmlFor="menu__toggle">
                <span></span>
            </label>
            <ul className="menu__box">
                <li><NavLink to="/" className="menu__item">Главная</NavLink></li>
                <li><NavLink to="/profile" className="menu__item">Профиль</NavLink></li>
                {role == 'admin' && <li><NavLink to="/listUsers" className="menu__item">Участники</NavLink></li>}
                <li><NavLink to="/listClients" className="menu__item">Клиенты</NavLink></li>
                {role == 'admin' && <li><NavLink to="/listDeals" className="menu__item">Архив</NavLink></li>}
                <li className="menu__item" onClick={() => handlerLogout()}>Выход</li>
            </ul>
        </div>
    )
}

export default Sidebar
