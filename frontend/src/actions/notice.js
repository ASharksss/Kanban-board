import axios from "axios";
import {get_notice} from "../reducers/noticeReducer";

export const requestNotice = () => {
    return dispatch => {
        try {
            axios.get('/notice/').then(response => {
                if (response.data.serverStatus == 1) {
                    dispatch(get_notice(response.data.notice))
                }
            })
        } catch (e) {
            alert('Неизвестная ошибка!')
        }
    }
}

export const requestCheckNotice = (n_id) => {
    return dispatch => {
        try {
            axios.put('/notice/checked/' + n_id).then(response => {
                if (response.data.serverStatus == 1) {
                    dispatch(requestNotice())
                } else {
                    alert(response.data.message)
                }
            })
        } catch (e) {
            alert('Неизвестная ошибка!')
        }
    }
}

