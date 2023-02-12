import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";

import {requestAllTasks} from "../../actions/task";

import './Kanban.css'
import './Task.css'

import add from './../../img/add-square.png'
import more from "../../img/more.png";
import avatar from "../../img/avatar.png";
import members from "../../img/members.png"

function Kanban(tasks) {

    const [boards, setBoards] = useState([
        {
            id: 'q1',
            title: 'Обработка заявки',
            class_name: 'column first',
            items: [
                {
                    id: 't1',
                    title: 'Название сделки 1',
                    client: 'Шарипов Т.А.',
                    price: 'Бесценно',
                    start_date: '12.05.21',
                    end_date: '21.04.22',
                    user: 'Alsu Kurbanalieva'
                },
                {
                    id: 't6',
                    title: 'Название сделки 6',
                    client: 'Шарипов Т.А.',
                    price: 'Бесценно',
                    start_date: '12.05.21',
                    end_date: '21.04.22',
                    user: 'Alsu Kurbanalieva'
                }
            ]
        },
        {
            id: 'q2',
            title: 'Проектирование',
            class_name: 'column second',
            items: [
                {
                    id: 't2',
                    title: 'Название сделки 2',
                    client: 'Шарипов Т.А.',
                    price: 'Бесценно',
                    start_date: '12.05.21',
                    end_date: '21.04.22',
                    user: 'Alsu Kurbanalieva'
                }
            ]
        },
        {
            id: 'q3',
            title: 'Снабжение',
            class_name: 'column third',
            items: [
                {
                    id: 't3',
                    title: 'Название сделки 3',
                    client: 'Шарипов Т.А.',
                    price: 'Бесценно',
                    start_date: '12.05.21',
                    end_date: '21.04.22',
                    user: 'Alsu Kurbanalieva'
                }
            ]
        },
        {
            id: 'q4',
            title: 'Производство',
            class_name: 'column forth',
            items: [
                {
                    id: 't4',
                    title: 'Название сделки 4',
                    client: 'Шарипов Т.А.',
                    price: 'Бесценно',
                    start_date: '12.05.21',
                    end_date: '21.04.22',
                    user: 'Alsu Kurbanalieva'
                }
            ]
        },
        {
            id: 'q5',
            title: 'Монтаж',
            class_name: 'column fifth',
            items: [
                {
                    id: 't5',
                    title: 'Название сделки 5',
                    client: 'Шарипов Т.А.',
                    price: 'Бесценно',
                    start_date: '12.05.21',
                    end_date: '21.04.22',
                    user: 'Alsu Kurbanalieva'
                }
            ]
        }
    ])
    const [currentBoard, setCurrentBoard] = useState(null)
    const [currentItem, setCurrentItem] = useState(null)
    const [test, setTest] = useState(null)
    const dispatch = useDispatch()
    // const getTasks = useCallback(() => dispatch(requestAllTasks()), [dispatch]);

    useEffect(() => {
        setTest(null)
        // getTasks()
        dispatch(requestAllTasks())
        setTest([{
            stages: tasks.tasks.stages,
            tasks: tasks.tasks.task
        }])
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
                        <button onClick={() => dispatch(requestAllTasks())} className="clients">Наши клиенты</button>
                    </NavLink>
                    <div className="addClient btns_add">
                        <NavLink to="/addClient" className="cbtn">
                            <button>
                                <p>+</p>
                            </button>
                        </NavLink>
                    </div>
                </div>

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
                </div>

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
                                {board.title === "Обработка заявки" &&
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
                                        <NavLink to="/deal" className="task_title">{item.title}</NavLink>
                                        <button className="btn_more">
                                            <img src={more} alt=""/>
                                        </button>
                                    </div>
                                    <div className="more_inf">
                                        <p className="сlient">{item.client}</p>
                                        <p className="price">{item.price}</p>
                                    </div>
                                    <div className="date">
                                        <p className="stand_date">{item.start_date}</p>
                                        <p className="end_date">{item.end_date}</p>
                                    </div>
                                    <div className="user">
                                        <img src={avatar} alt=""/>
                                        <p className="userName">{item.user}</p>
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