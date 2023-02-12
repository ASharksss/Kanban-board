import axios from "axios";
import {failed, success} from "../reducers/authReducer";
import {requestAllTasks} from "./task";


export const requestLogin = (username, password) => {
    return dispatch => {
        try {
            axios({
                method: 'post',
                url: '/signin',
                data: {
                    username: username,
                    password: password
                }
            })
                .then(function (response) {
                    if (response.data.serverStatus == 1) {
                        const data = {
                            token: response.data.accessToken,
                            role: response.data.role
                        }
                        dispatch(success(data))
                        localStorage.setItem('token', response.data.accessToken)
                        axios.defaults.headers.common = {'Authorization': `Bearer ${response.data.accessToken}`}
                        dispatch(requestAllTasks())
                    } else {
                        dispatch(failed(response.data.message))
                    }
                }).catch(error => {
                console.log(error)
                dispatch(failed("Ошибка связи с сервером!"))

            });
        } catch (e) {
            console.log(e)
            dispatch(failed("Неизвестная ошибка"))
        }
    }
}
