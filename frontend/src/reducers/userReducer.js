const ADD_USER = 'ADD_USER'
const ALL_USER = 'ALL_USER'
const GET_PROFILE = 'GET_PROFILE'
const ERROR_USER = 'ERROR_USER'

const initialState = {
    error: '',
    profile: {},
    users: {}
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_USER:
            return {
                ...state
            }
        case ALL_USER:
            return {
                ...state,
                users: action.payload
            }
        case ERROR_USER:
            return {
                ...state,
                error: action.payload
            }
        case GET_PROFILE:
            return {
                ...state,
                profile: action.payload
            }
        default:
            return state
    }
}

export const add_user = () => ({type: ADD_USER})
export const get_profile = data => ({type: GET_PROFILE, payload: data})
export const all_users = data => ({type: ALL_USER, payload: data})
export const error_user = message => ({type: ADD_USER, payload: message})
