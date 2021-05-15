import Axios from 'axios'
import { store } from './store.js'
import { baseUrl, notify } from '../utils'

const modalVis = (bool, dispatch) => {
    dispatch({
        type: 'VISIBLE',
        payload: bool
    })
}

export const getAllNotes = () => {
    return dispatch => {
        Axios.get(baseUrl+'get-notes')
            .then(json => {
                if (json && json.data && json.data.notes) {
                    dispatch({
                        type: 'SET_NOTES',
                        payload: json.data.notes
                    })
                }
                else {
                    console.error(json.data)
                    notify("error", "Unable to get notes, please try again later")
                }
            })
            .catch(error => {
                console.error(error)
                notify("error", "Unable to get notes, please try again later")
            })
    }
}

export const deleteNote = id => {
    return dispatch => {
        Axios.post(baseUrl+"delete-note", {id})
            .then(json => {
                let tempNotes = store.getState().notes
                dispatch({
                    type: 'SET_NOTES',
                    payload: tempNotes.filter(item => item._id !== id)
                })
            })
            .catch(error => console.error(error))
    }
}

export const addNote = (title, desc) => {
    return dispatch => {
        Axios.post(baseUrl+"save-note", { title, desc })
            .then(json => {
                dispatch({
                    type: 'ADD_NOTE',
                    payload: json.data.notes
                })
                modalVis(false, dispatch)
            })
            .catch(err => {
                console.error(err)
                modalVis(false, dispatch)
            })
    }
}

export const updateNote = (title, desc, activeNote) => {
    return dispatch => {
        let updatedValues = {}

        // detecting and adding changed keys only
        if (title !== activeNote.title) {
            updatedValues['title'] = title
        }
        if (desc !== activeNote.desc) {
            updatedValues['desc'] = desc
        }

        Axios.put(baseUrl+'update-note', {
            id: activeNote._id,
            changes: Object.assign({}, updatedValues)
        })
        .then(json => {
            const tempNotes = store.getState().notes
            const tempObject = Object.assign({}, activeNote, updatedValues)
            dispatch({
                type: 'SET_NOTES',
                payload: tempNotes.map(item => item._id === tempObject._id ? tempObject : item )
            })
            modalVis(false, dispatch)
        })
        .catch(err => {
            console.error(err)
            modalVis(false, dispatch)
        })
    }
}

export const setModalVisible = (bool) => {
    return dispatch => {
        dispatch({
            type: 'VISIBLE',
            payload: bool
        })
    }
}