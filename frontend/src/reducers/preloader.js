const START_PRELOADER = 'START_PRELOADER';
const STOP_PRELOADER = 'STOP_PRELOADER';

const initialState = {
    isLoading: false
}

export default function preloaderReducer(state=initialState, action) {
    switch (action.type) {
        case START_PRELOADER:
            return {
                ...state,
                isLoading: true
            }
        case STOP_PRELOADER:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state
    }
}

export const startPreloader = () => ({type: START_PRELOADER})
export const stopPreloader = () => ({type: STOP_PRELOADER})
