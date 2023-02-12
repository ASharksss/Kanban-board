import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {requestGetProfile} from "../../actions/user";

import avatar from "../../img/avatar.png";
import './Profile.css'
import {NavLink} from "react-router-dom";


function Profile(){
    const dispatch = useDispatch()
    const {profile} = useSelector(state => state.user)
    useEffect(() => {
        dispatch(requestGetProfile())
    }, [])
    return(
        <div className="profile_container">
            <div className="profile_header">
                <h1>My Profile</h1>
                <div className="profile__row">
                    <div className="profile__img">
                        <div className="profile__avatar">
                            <img src={avatar} alt="avatar"/>
                        </div>
                        <div className="img__desc">
                            <p className="account_name">{profile.fio}</p>
                            <p className="job_title">{profile.role}</p>
                        </div>
                        <button className="btn_edit">Edit Profile</button>
                        <NavLink to="/listUsers">
                            <button className="btn_users">
                            List Users</button>
                        </NavLink>
                    </div>
                    <div className="profile__inf">
                        <div className="inf__header">
                            <h2 className="basic_inf">BASIC INFO</h2>
                            <div className="inf__btn">
                                <button className="btn_save">Save</button>
                                <button className="btn_cancel">Cancel</button>
                            </div>
                        </div>
                        <input value={profile.username} type="text" placeholder="Login" disabled={true}/>
                        <input value={profile.fio} type="text" placeholder="ФИО" disabled={true}/>
                        <input value={profile.email} type="text" placeholder="Email" disabled={true}/>
                        <input value={profile.job_title} type="text" placeholder="Должность" disabled={true}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;