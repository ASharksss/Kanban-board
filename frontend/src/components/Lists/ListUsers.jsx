import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import './lists.css'
import {Search} from "../Search/Search";
import avatar from "../../img/avatar.png";
import {useDispatch, useSelector} from "react-redux";
import {requestAllUsers, requestDisableUser} from "../../actions/user";

function ListUsers() {
    const [search, setSearch] = useState('')
    const dispatch = useDispatch()
    const {users} = useSelector(state => state.user)

    useEffect(() => {
        dispatch(requestAllUsers())
    }, [])

    function handlerBlock(u_id, status) {
        if (status == false) {
            dispatch(requestDisableUser(u_id, 'disabled'))
        } else if (status == true) {
            dispatch(requestDisableUser(u_id, 'enabled'))
        }
    }
    let array = users,
        searchString = search.trim().toLowerCase();
    if (searchString.length > 0) {
        array = array.filter(function (i) {
            return i.fio.toLowerCase().match(searchString);
        });
    }
    return (
        <div className="lu_container">
            <div className="lu_header">
                <div className="flex">
                    <h1>Список пользователей</h1>
                    <NavLink to="/addUser" className="cbtn">
                        <button className="lu_btn">
                            <p>+</p>
                        </button>
                    </NavLink>
                </div>
                <Search searchValue={setSearch} search={search}/>
            </div>
            <table className="table">
                <thead>
                <th>Аватар</th>
                <th>ФИО</th>
                <th>Роль</th>
                <th>Должность</th>
                <th></th>
                </thead>
                <tbody>
                {array.map(item => {
                    return (
                        <tr>
                            <td>
                                <NavLink to="/profile">
                                    <img src={avatar} alt="avatar" className="avatar"/>
                                </NavLink>
                            </td>
                            <td>{item.fio}</td>
                            <td>{item.role}</td>
                            <td>{item.job_title}</td>
                            {item.role != 'admin' &&
                                <td>{!item.disable ?
                                    <p onClick={() => handlerBlock(item.id, item.disable)}>Блокировать</p> :
                                    <p onClick={() => handlerBlock(item.id, item.disable)}>Разблокировать</p>}</td>
                            }
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}

export default ListUsers