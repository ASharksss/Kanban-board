import axios from "axios";
import {add_user, all_users, error_user, get_profile} from "../reducers/userReducer";
import {startPreloader, stopPreloader} from "../reducers/preloader";

export const requestAddUser = (fio, username, password, jobTitle) => {
    return dispatch => {
        try {
            dispatch(startPreloader())
            axios.post('/admin/add/user', {
                fio: fio,
                job_title: jobTitle,
                username: username,
                password: password
            }).then(response => {
                dispatch(stopPreloader())
                if (response.data.serverStatus == 1) {
                    alert('Пользователь добавлен')
                    dispatch(add_user())
                } else {
                    alert(response.data.message)
                    dispatch(error_user(response.data.message))
                }
            })
        } catch (e) {
            dispatch(stopPreloader())
            console.log(e)
            dispatch(error_user("Неизвестная ошибка"))
        }
    }
}

export const requestGetProfile = () => {
    return dispatch => {
        try {
            dispatch(startPreloader())
            axios.get('/profile/').then(response => {
                dispatch(stopPreloader())
                if (response.data.serverStatus == 1) {
                    dispatch(get_profile(response.data.user))
                } else {
                    alert('Ошибка на сервере')
                    dispatch(error_user('Ошибка на сервере'))
                }
            })

        } catch (e) {
            dispatch(stopPreloader())
            console.log(e)
            dispatch(error_user("Неизвестная ошибка"))
        }
    }
}

export const requestDisableUser = (u_id, type) => {
    return dispatch => {
        try {
            if (type == 'disabled') {
                axios.delete('/user/disable/' + u_id).then(response => {
                    if (response.data.serverStatus == 1) {
                        alert(response.data.message)
                        dispatch(requestAllUsers())
                    } else {
                        alert('Ошибка на сервере')
                    }
                })
            } else if (type == 'enabled') {
                axios.delete('/user/enable/' + u_id).then(response => {
                    if (response.data.serverStatus == 1) {
                        alert(response.data.message)
                        dispatch(requestAllUsers())
                    } else {
                        alert('Ошибка на сервере')
                    }
                })
            }
        } catch (e) {
            alert('Ошибка при выполнении!')
        }
    }
}

export const requestAllUsers = () => {
    return dispatch => {
        try {
            dispatch(startPreloader())
            axios.get('/user/all').then(response => {
                dispatch(stopPreloader())
                if (response.data.serverStatus == 1) {
                    dispatch(all_users(response.data.users))
                } else {
                    alert('Ошибка на сервере')
                    dispatch(error_user('Ошибка на сервере'))
                }
            })

        } catch (e) {
            dispatch(stopPreloader())
            console.log(e)
            dispatch(error_user("Неизвестная ошибка"))
        }
    }
}
