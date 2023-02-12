import axios from "axios";
import {startPreloader, stopPreloader} from "../reducers/preloader";
import {all_tasks, archive, dnd_task, get_task} from "../reducers/taskReducer";
import {requestNotice} from "./notice";

export const requestAllTasks = () => {
    return dispatch => {
        try {
            dispatch(startPreloader())

            axios.get('/').then(response => {
                dispatch(stopPreloader())
                if (response.data.serverStatus == 1) {
                    dispatch(all_tasks(response.data.board))
                } else {
                    alert('Ошибка при загрузке задач!')
                }
            })
        } catch (e) {
            dispatch(startPreloader())
        }
    }
}

export const requestArchiveTasks = () => {
    return dispatch => {
        try {
            dispatch(startPreloader())
            axios.get('/archive').then(response => {
                dispatch(stopPreloader())
                if (response.data.serverStatus == 1) {
                    dispatch(archive(response.data.data))
                } else {
                    alert('Ошибка при загрузке задач!')
                }
            })
        } catch (e) {
            dispatch(startPreloader())
        }
    }
}

export const requestDNDTask = (t_id, s_id) => {
    return dispatch => {
        try {
            axios.put('/task/' + t_id + '/stage/' + s_id).then(response => {
                if (response.data.serverStatus == 1) {
                    dispatch(requestNotice())
                    dispatch(dnd_task())
                } else {
                    alert('Ошибка при обновлении!')
                }
            })
        } catch (e) {
            alert('Ошибка при обновлении!')
        }
    }
}

export const requestAddTask = (title, product, date, client) => {
    return dispatch => {
        try {
            axios.post('/task/add', {
                title: title,
                date: date,
                product: product,
                client: client
            }).then(response => {
                if (response.data.serverStatus == 1) {
                    alert('Заказ добавлен')
                    dispatch(requestAllTasks())
                } else {
                    alert('Ошибка при добавлении заказа')
                }
            })
        } catch (e) {
            alert('Ошибка при добавлении!')
        }
    }
}

export const requestGetTask = (id) => {
    return dispatch => {
        try {
            dispatch(startPreloader())
            axios.get('/task/' + id).then(response => {
                dispatch(stopPreloader())
                if (response.data.serverStatus == 1) {
                    dispatch(get_task(response.data.task))
                } else {
                    alert('Ошибка при загрузке задачи!')
                }
            })
        } catch (e) {
            dispatch(startPreloader())
        }
    }
}

export const requestDeleteTask = (id) => {
    return dispatch => {
        try {
            dispatch(startPreloader())
            axios.delete('/task/' + id).then(response => {
                dispatch(stopPreloader())
                if (response.data.serverStatus == 1) {
                    alert(response.data.message)
                } else {
                    alert('Ошибка при загрузке задачи!')
                }
            })
        } catch (e) {
            dispatch(startPreloader())
        }
    }
}

export const requestFinishTask = (id) => {
    return dispatch => {
        try {
            dispatch(startPreloader())
            axios.delete('/task/finish/' + id).then(response => {
                dispatch(stopPreloader())
                if (response.data.serverStatus == 1) {
                    alert(response.data.message)
                } else {
                    alert('Ошибка при загрузке задачи!')
                }
            })
        } catch (e) {
            dispatch(startPreloader())
        }
    }
}

export const requestGetTaskDocument = (id) => {
    return async dispatch => {
        try {
            await axios.get('/task/document/' + id).then(response => {
                if (response.data.serverStatus == 1) {
                    alert(response.data.message)
                } else {
                    alert('Ошибка при формировании документа!')
                }
            })
        } catch (e) {
            console.log(e)
        }
    }
}
