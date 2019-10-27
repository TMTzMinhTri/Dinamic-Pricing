import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk, { ThunkMiddleware } from 'redux-thunk'

import { RootAction } from "../Modals";
import userinfo from './reducers/auth.reducer'

const rootReducer = combineReducers({
    userinfo
})

const composeEnhancers = process.env.NODE_ENV === 'production'
    ? compose
    : (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const middleware = [thunk as ThunkMiddleware<RootState, RootAction>]


export type RootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer,
    composeEnhancers(applyMiddleware(...middleware))
)