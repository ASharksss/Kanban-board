import React from "react";
import {useDispatch, useSelector} from "react-redux";
import './Notification.css';
import './Message/Message.css';
import {slow} from "../../reducers/noticeReducer";
import {requestCheckNotice} from "../../actions/notice";
import {NavLink} from "react-router-dom";


export const Notification = () => {

    const {notice, isActive} = useSelector(state => state.notice)
    const dispatch = useDispatch()

    if (notice.length > 0) {
        return (
            <div className={isActive ? "notice active" : "notice"}>
                <div className="messages" onClick={e => e.stopPropagation()}>
                    {notice.map(item => {
                        return (
                            <div className="message_container">
                                <div className="message_header">
                                    <div className="message_header_title">
                                        <span className="n_circle"></span>
                                        <p className="application_name">Уведомление</p>
                                    </div>
                                    <p className="message_date">
                                        {item.date}
                                    </p>
                                </div>
                                <div className="message_body">
                                    {item.move ?
                                        <p className="message_title">
                                            Задача перемещена!
                                        </p> :
                                        <p className="message_title">
                                            Добавлена новая задача!}
                                        </p>}
                                    <p className="message_text">
                                        <NavLink to={"/deal/" + item.task.id}>Сделка №{item.task.id}</NavLink>,
                                        заказ {item.task.title}, {item.task.status.name}
                                    </p>
                                    <div className="btns">
                                        <button className="check" onClick={() => {
                                            dispatch(requestCheckNotice(item.id))
                                        }}>Прочтено
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    } else {
        return (
            <div className={isActive ? "notice active" : "notice"}>
                <div className="messages" onClick={e => e.stopPropagation()}>
                    <div className="message_container">
                        <div className="message_header">
                            <div className="message_header_title">
                                <span className="n_circle"></span>
                                <p className="application_name">Уведомление</p>
                            </div>
                            <p className="message_date">
                            </p>
                        </div>
                        <div className="message_body">
                            <p className="message_title">
                            </p>
                            <p className="message_text">
                                Уведомлений нет
                            </p>
                            <div className="btns">
                                <button className="check" onClick={() => {
                                    dispatch(slow())
                                }}>Закрыть
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
