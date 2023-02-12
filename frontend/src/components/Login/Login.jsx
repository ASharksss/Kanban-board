import React, {useState} from 'react'
import './Login.css'
import logImg from './../../img/login.png'
import {requestLogin} from "../../actions/auth";
import {useDispatch, useSelector} from "react-redux";


function Login() {
    const authStore = useSelector(state => state.auth);
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className="login_container">
            <div className="main_img">
                <img src={logImg} alt=""/>
            </div>
            <div className="login_form">
                <div className="login_text">
                    <p className="top_title">Добро пожаловать!</p>
                    <p className="login_title">Войдите в свой аккаунт</p>
                    <form className="form" onSubmit={e => {
                        e.preventDefault()
                        dispatch(requestLogin(username, password))
                    }}>
                        {authStore.error ? <p className="error">{authStore.error}</p> : ''}

                        <label htmlFor="login">Логин</label><br/>
                        <input className="login-input" value={username} onChange={e => setUsername(e.target.value)}
                               type="text"
                               name="login"/><br/>
                        <label htmlFor="password">Пароль</label><br/>
                        <input className="login-input" value={password} onChange={e => setPassword(e.target.value)}
                               type="password"
                               name="password"/>
                        <div className="login_btn">
                            <button className="btn-grad"
                                    onClick={() => dispatch(requestLogin(username, password))}>Войти
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;