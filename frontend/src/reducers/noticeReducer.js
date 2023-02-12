const GET_NOTICE = 'GET_NOTICE'
const SHOW_NOTICE = 'SHOW_NOTICE'
const SLOW_NOTICE = 'SLOW_NOTICE'


const initialState = {
    notice: {},
    isActive: false
}

export default function noticeReducer(state = initialState, action) {
    switch (action.type) {
        case GET_NOTICE:
            return {
                ...state,
                notice: action.payload
            }
        case SHOW_NOTICE:
            return {
                ...state,
                isActive: true
            }
        case SLOW_NOTICE:
            return {
                ...state,
                isActive: false
            }
        default:
            return state
    }
}

export const get_notice = data => ({type: GET_NOTICE, payload: data})
export const show = () => ({type: SHOW_NOTICE})
export const slow = () => ({type: SLOW_NOTICE})
