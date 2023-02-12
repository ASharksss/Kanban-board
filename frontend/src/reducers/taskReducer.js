const ARCHIVE_TASKS = 'ARCHIVE_TASKS'
const GET_TASK = 'GET_TASK'
const ALL_TASKS = 'ALL_TASKS'
const UPDATE_TASK = 'UPDATE_TASK'
const DND_TASK = 'DND_TASK'

const initialState = {
    error: '',
    archive: {},
    task: {},
    objective: {}
}

export default function taskReduce(state=initialState, action) {
    switch (action.type) {
        case GET_TASK:
            return {
                ...state,
                objective: action.payload,
                error: ''
            }
        case ARCHIVE_TASKS:
            return {
                ...state,
                archive: action.payload
            }
        case ALL_TASKS:
            return {
                ...state,
                error: '',
                task: action.payload
            }
        case UPDATE_TASK:
            return {
                ...state,
                error: '',
                task: action.payload
            }
        case DND_TASK:
            return {
                ...state
            }
        default:
            return state
    }
}

export const all_tasks = data => ({type: ALL_TASKS, payload: data})
export const archive = data => ({type: ARCHIVE_TASKS, payload: data})
export const dnd_task = () => ({type: DND_TASK})
export const get_task = data => ({type: GET_TASK, payload: data})
