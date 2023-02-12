import React from "react";
import smallIcon from './../../../img/smallIcon.png'
import './Message.css'
import Notif from "../../../img/Vector.png";


function Message() {
    return(
        <div className="message_container">

            <div className="message_header">
                <div className="message_header_title">
                    <span className="n_circle"></span>
                    <p className="application_name">Уведомление</p>
                </div>
                <p className="message_date">
                    now
                </p>

            </div>
            <div className="message_body">
                <p className="message_title">
                    Hi, i'm Notifaction!
                </p>
                <p className="message_text">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </p>
            </div>
        </div>
    )
}

export default Message