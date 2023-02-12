import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import './lists.css'
import {Search} from "../Search/Search";
import {requestArchiveTasks} from "../../actions/task";

function ListDeals() {
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState(0)
    const dispatch = useDispatch()

    const {archive} = useSelector(state => state.task)

    useEffect(() => {
        dispatch(requestArchiveTasks())
    }, [])

    let array = archive,
        searchString = search.trim().toLowerCase();
    if (searchString.length > 0) {
        array = array.filter(function (i) {
            return i.title.toLowerCase().match(searchString);
        });
    }
    if (filter) {
        array = array.filter(function (i) {
            if (filter == 1) {
                return i.status.name.toLowerCase().match('завершены')
            } else if (filter == 2) {
                return i.status.name.toLowerCase().match('отменена')
            } else {
                return array
            }
        });
    }
    return (
        <div className="lu_container">
            <div className="lu_header">
                <div className="flex">
                    <h1>Архив сделок</h1>
                </div>
                <div className="ld_inputs">
                    <div className="filter">
                        <select onChange={e => setFilter(e.target.value)} name="" id="" className="search">
                            <option value="0" selected>Показать сделки...</option>
                            <option value="1">Только завершенные</option>
                            <option value="2">Только отмененные</option>
                        </select>
                    </div>
                    <Search searchValue={setSearch} search={search}/>
                </div>
            </div>
            <table className="table">
                <thead>
                <th>Наименование</th>
                <th>Клиент</th>
                <th>Стоимость</th>
                <th>Адрес</th>
                <th>Дата</th>
                <th>Статус</th>
                </thead>
                <tbody>
                {array.map(item => {
                    return (
                        <tr>
                            <td>
                                {item.title}
                            </td>
                            <td>{item.client.fio}</td>
                            <td>{item.price}</td>
                            <td>{item.address}</td>
                            <td>{item.date}</td>
                            <td>{item.status.name}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}

export default ListDeals