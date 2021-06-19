import { initialState } from './store.js'

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'ADD_NOTE':
            return { ...state, notes: [ ...state.notes, action.payload ] }
        case 'SET_NOTES':
            return { ...state, notes: action.payload, loading: false }
        case 'VISIBLE':
            return { ...state, modalVisible: action.payload }
        default:
            return { ...state }
    }
}

export default rootReducer
