import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import './lists.css'
import {Search} from "../Search/Search";
import {requestAllClients} from "../../actions/client";

function ListClients() {
    const [search, setSearch] = useState('')
    const dispatch = useDispatch()

    const {client} = useSelector(state => state.client)

    useEffect(() => {
        dispatch(requestAllClients())
    }, [])

    let array = client,
        searchString = search.trim().toLowerCase();
    if (searchString.length > 0) {
        array = array.filter(function (i) {
            return i.fio.toLowerCase().match(searchString)
        });
    }

    return (
        <div className="lu_container">
            <div className="lu_header">
                <div className="flex">
                    <h1>Список клиентов</h1>
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
                <th>ФИО</th>
                <th>Номер телефона</th>
                </thead>
                <tbody>
                {array.map(item => {
                    return (
                        <tr key={item.id}>
                            <td>{item.fio}</td>
                            <td>{item.tel_number}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}

export default ListClients