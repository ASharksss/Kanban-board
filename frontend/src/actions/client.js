import axios from "axios";
import {add_client, all_clients, error_clients} from "../reducers/clientReducer";

export const requestAllClients = () => {
    return dispatch => {
        try {
            axios.get('/client/all').then(response => {
                if (response.data.serverStatus == 1) {
                    dispatch(all_clients(response.data.clients))
                } else {
                    dispatch(error_clients('Ошибка при выгрузке'))
                    alert('Ошибка при выгрузке клиентов!')
                }
            })

        } catch (e) {
            dispatch(error_clients('Неизвестная ошибка'))
        }
    }
}

export const requestAddClient = (fio, tel_number) => {
    return dispatch => {
        try {
            axios.post('/client/add', {
                fio: fio,
                tel_number: tel_number
            }).then(response => {
                if (response.data.serverStatus == 1) {
                    dispatch(add_client())
                    alert('Клиент добавлен')
                } else {
                    dispatch(error_clients('Ошибка при добавлении'))
                    alert('Ошибка при добавлении клиента!')
                }
            })

        } catch(e) {
            dispatch(error_clients('Неизвестная ошибка'))
        }
    }
}
