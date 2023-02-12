const ADD_CLIENT = 'ADD_CLIENT'
const ALL_CLIENTS = 'ALL_CLIENTS'
const ERROR_CLIENT = 'ERROR_CLIENT'

const initialState = {
    client: {},
    error: ''
}

export default function clientReducers(state=initialState, action) {
    switch (action.type) {
        case ADD_CLIENT:
            return {
                ...state,
            }
        case ERROR_CLIENT:
            return {
                ...state,
                error: action.payload
            }
        case ALL_CLIENTS:
            return {
                ...state,
                client: action.payload
            }
        default:
            return state
    }
}

export const all_clients = data => ({type: ALL_CLIENTS, payload: data})
export const add_client = () => ({type: ADD_CLIENT})
export const error_clients = message => ({type: ERROR_CLIENT, payload: message})
