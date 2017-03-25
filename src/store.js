import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Reducers } from './reducers/index'

const AppReducer = combineReducers(Reducers)
const store = createStore(AppReducer, applyMiddleware(thunk))

export default store
