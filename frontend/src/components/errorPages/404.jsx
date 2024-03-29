import React from 'react';
import {NavLink} from 'react-router-dom'
import {useSelector} from "react-redux";
import './style.css'


function Page404() {
    const isAuth = useSelector(state => state.auth.isAuth)
    return (
        <div className="error-container">
            <div id="box">
                <svg className="notFound" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24"
                     height="100px" viewBox="0 0 24 24" width="100px">
                    <g>
                        <rect fill="none" height="24" width="24"/>
                    </g>
                    <g>
                        <g>
                            <path
                                d="M15.5,14h-0.79l-0.28-0.27C15.41,12.59,16,11.11,16,9.5C16,5.91,13.09,3,9.5,3C6.08,3,3.28,5.64,3.03,9h2.02 C5.3,6.75,7.18,5,9.5,5C11.99,5,14,7.01,14,9.5S11.99,14,9.5,14c-0.17,0-0.33-0.03-0.5-0.05v2.02C9.17,15.99,9.33,16,9.5,16 c1.61,0,3.09-0.59,4.23-1.57L14,14.71v0.79l5,4.99L20.49,19L15.5,14z"/>
                            <polygon
                                points="6.47,10.82 4,13.29 1.53,10.82 0.82,11.53 3.29,14 0.82,16.47 1.53,17.18 4,14.71 6.47,17.18 7.18,16.47 4.71,14 7.18,11.53"/>
                        </g>
                    </g>
                </svg>
                <h1 className="h1-error">404</h1>
                <h2 className="h2-error">NOT FOUND</h2>
            </div>
            <div id="box2">
                <h2>Такой страницы нет!</h2>
                {!isAuth ?
                    <NavLink className="link-error" to='/'>Войти</NavLink> :
                    <NavLink className="link-error" to='/'>На главную</NavLink>
                }
            </div>
        </div>
    )
}

export default Page404;