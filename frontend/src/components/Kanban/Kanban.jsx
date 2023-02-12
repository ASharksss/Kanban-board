import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";

import {requestAllTasks, requestArchiveTasks, requestDNDTask, requestGetTask} from "../../actions/task";
import {requestAllClients} from "../../actions/client";

import './Kanban.css'
import './Task.css'

import add from './../../img/add-square.png'
import more from "../../img/more.png";
import avatar from "../../img/avatar.png";
import members from "../../img/members.png"
import {requestNotice} from "../../actions/notice";
import {requestAllUsers} from "../../actions/user";

function Kanban() {

    const role = useSelector(state => state.auth.role)
    const [boards, setBoards] = useState([])
    const [currentBoard, setCurrentBoard] = useState(null)
    const [currentItem, setCurrentItem] = useState(null)
    const dispatch = useDispatch()
    const {task} = useSelector(state => state.task)
    useCallback(() => setBoards(task), [currentBoard])

    useEffect(() => {
        dispatch(requestAllTasks())
        dispatch(requestAllUsers())
        dispatch(requestNotice())
        dispatch(requestArchiveTasks())
        dispatch(requestAllClients())
        setBoards(task)
    }, [])

    function dragOverHandler(e) {
        e.preventDefault()
    }

    function dragStartHandler(e, board, item) {
        setCurrentBoard(board)
        setCurrentItem(item)
    }

    function dropHandler(e, board, item) {
        e.preventDefault()
        e.stopPropagation()
        const currentIndex = currentBoard.items.indexOf(currentItem)
        currentBoard.items.splice(currentIndex, 1)
        const dropIndex = board.items.indexOf(item)
        board.items.splice(dropIndex + 1, 0, currentItem)
        setBoards(boards.map(b => {
            if (b.id === boards.id) {
                return board
            }
            if (b.id === currentBoard.id) {
                return currentBoard
            }
            return b
        }))
    }

    function dropCardHandler(e, board) {
        board.items.push(currentItem)
        const currentIndex = currentBoard.items.indexOf(currentItem)
        currentBoard.items.splice(currentIndex, 1)
        if (board.id != 0 & currentItem.id != 0) {
            dispatch(requestDNDTask(currentItem.id, board.id))
        }
        setBoards(boards.map(b => {
            if (b.id === boards.id) {
                return board
            }
            if (b.id === currentBoard.id) {
                return currentBoard
            }
            return b
        }))
    }

    return (
        <div className="container">
            <div className="container_header">
                <div className="btnsClient ">
                    <NavLink to="/listClients" className="cbtn">
                        <button className="clients">Наши клиенты</button>
                    </NavLink>
                    <div className="addClient btns_add">
                        <NavLink to="/addClient" className="cbtn">
                            <button>
                                <p>+</p>
                            </button>
                        </NavLink>
                    </div>
                </div>

                {role == 'admin' &&
                    <div className="k_btns">
                        <NavLink to="/listUsers" className="cbtn">
                            <button className="k_listUsers">
                                <img src={members} alt=""/>
                                <p>Участники</p>
                            </button>
                        </NavLink>
                        <div className="btns_add">
                            <NavLink to="/addUser" className="cbtn">
                                <button>
                                    <p>+</p>
                                </button>
                            </NavLink>
                        </div>
                    </div>}
            </div>
            <div className="processes">
                <div className="row">
                    {boards.map((board, index) =>
                        <div className={board.class_name}
                             key={index}
                             onDragOver={(e) => dragOverHandler(e)}
                             onDrop={(e) => dropCardHandler(e, board)}>
                            <div className="column-header">
                                <span></span>
                                <p className="nameProcess">{board.title}</p>
                                {board.first &&
                                    <NavLink to="/addTask" className="btn_add">
                                        <button className="addTask">
                                            <img src={add} alt=""/>
                                        </button>
                                    </NavLink>
                                }
                                <span className="border"></span>
                            </div>
                            {board.items.map((item, index) =>
                                <div className="task"
                                     key={index}
                                     onDragOver={(e) => dragOverHandler(e)}
                                     onDragStart={(e) => dragStartHandler(e, board, item)}
                                     onDrop={(e) => dropHandler(e, board, item)}
                                     draggable={true}>
                                    <div className="header">
                                        <NavLink to={"/deal/" + item.id}
                                                 className="task_title">{item.title}</NavLink>
                                        <button className="btn_more">
                                            <img src={more} alt=""/>
                                        </button>
                                    </div>
                                    <div className="more_inf">
                                        <p className="сlient">{item.client.fio}</p>
                                        <p className="price">{item.price}</p>
                                    </div>
                                    <div className="date">
                                        <p className="end_date">{item.status.name}</p>
                                        <p className="stand_date">{item.date}</p>
                                    </div>
                                    <div className="user">
                                        <img src={avatar} alt=""/>
                                        <p className="userName">{item.user.fio}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Kanban;