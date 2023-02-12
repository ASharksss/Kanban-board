import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
// import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from "redux-thunk";

import authReducer from "./authReducer";
import taskReducer from "./taskReducer";
import userReducer from "./userReducer";
import noticeReducer from "./noticeReducer";
import clientrReducer from "./clientReducer";
import preloaderReducer from "./preloader";

const rootReducers = combineReducers({
    auth: authReducer,
    user: userReducer,
    task: taskReducer,
    client: clientrReducer,
    notice: noticeReducer,
    preloader: preloaderReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //for Redux DevTools

export const store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunk)));

//export const store = createStore(rootReducers, composeWithDevTools(applyMiddleware(thunk)))
