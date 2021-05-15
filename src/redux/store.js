import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducer.js'

const initialState = {
    notes: [],
    loading: false,
    modalVisible: false
}

const store = createStore(rootReducer, applyMiddleware(thunk))

export {
    store,
    initialState
}
