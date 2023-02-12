import React, {useState} from 'react';
import search from '../../img/search-normal.png'
import avatar from '../../img/avatar.png'
import logo from '../../img/favicon.png'
import Notif from '../../img/Vector.png'
import './Header.css'
import {Notification} from "../Notifaction/Notification";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {show, slow} from "../../reducers/noticeReducer";
import {requestNotice} from "../../actions/notice";


function Header() {
    const {isActive, notice} = useSelector(state => state.notice)
    const dispatch = useDispatch()

    return (
        <header>
            <div className="right">
                <div className="logo">
                    <NavLink style={{width: 0}} to="/"><img src={logo} alt=""/></NavLink>
                </div>
            </div>

            <p className="nameCompany">Мебельная мастерская</p>

            <div className="notif">
                <input id="ch__toggle" type="checkbox"/>
                <label className="ch__btn" htmlFor="ch__toggle">
                    <img src={Notif} alt="" style={{cursor: "pointer"}} onClick={() => {
                        if (!isActive) {
                            dispatch(requestNotice())
                            dispatch(show())
                        } else {
                            dispatch(slow())
                        }
                    }}/>
                    {notice.length > 0 && <span className="circle"></span>}
                </label>
            </div>
            <div className="account">

                <div className="account__inf">
                    <p className="username">Alsu Kurbanalieva</p>
                    <p className="JobTitle">Admin</p>
                </div>
                <NavLink to="/profile">
                    <img src={avatar} alt="avatar" className="avatar"/>
                </NavLink>
            </div>
            <Notification />
        </header>
    )
}

export default Header