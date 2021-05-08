import React, {useState, useEffect, useRef} from 'react';
import Axios from 'axios';
import {Input, Card, notification, Modal, Space, Skeleton, Button} from 'antd';
import {PlusCircleOutlined, DeleteFilled, EditFilled} from '@ant-design/icons';
import './App.scss';

const { Meta } = Card;

function notify(type, message, description, duration) {
    notification[type]({
        message,
        description,
        duration,
    })
}

export default function App() {
    const baseUrl = 'https://sheltered-taiga-65593.herokuapp.com/'

    const [notes, setNotes] = useState([]);
    const [visible, setVisible] = useState(false);
    const [activeNote, setActiveNote] = useState(null);
    const [notesLoading, setNotesLoading] = useState(null);
    const [mode, setMode] = useState(null)

    const titleRef = useRef()
    const descRef = useRef()

    useEffect(() => {
        getNotes()
    }, [])

    const getNotes = () => {
        setNotesLoading(true)
        Axios.get(baseUrl+'get-notes').then(json => {
            if (json && json.data && json.data.notes) {
                setNotes(json.data.notes)
                setNotesLoading(false)
            }
            else {
                console.log(json.data)
                notify("error", "Unable to get notes, please try again later")
                setNotesLoading(false)
            }
        }).catch(error => {
            console.log(error)
            notify("error", "Unable to get notes, please try again later")
            setNotesLoading(false)
        })
    }

    const handleCardClick = e => {
        setVisible(true)
        setMode("edit")
        setActiveNote(e)
    }
    const addNewNote = () => {
        setVisible(true)
        setMode("add")
        setActiveNote({title: "", desc: ""})
    }
    const updateNote = () => {
        let updatedValues = {};
        if (titleRef.current.state.value !== activeNote.title) {
            updatedValues['title'] = titleRef.current.state.value
        }
        if (descRef.current.state.value !== activeNote.desc) {
            updatedValues['desc'] = descRef.current.state.value
        }
        Axios.put(baseUrl+'update-note', {
            id: activeNote._id,
            changes: Object.assign({}, updatedValues)
        })
            .then(json => {
                console.log(json)
                setVisible(false)
                getNotes()
            })
            .catch(err => console.log(err))
    }

    const deleteNote = id => {
        Axios.post(baseUrl+"delete-note", {id}).then(json => {
            console.log(json.data)
            if (json) getNotes()
        }).catch(error => console.log(error))
    }
    const addNote = () => {
        const title = titleRef.current.state.value;
        const desc = descRef.current.state.value;
        Axios.post(baseUrl+"save-note", { title, desc }).then(json => {
            console.log(json)
            setVisible(false)
            getNotes()
        }).catch(err => console.log(err))
    }
    const handleInputChange = val => {
        console.log(val)
    }

    return (
        <div className="App">
            <div className="App-header">
                <Input placeholder="Search notes" size="large" onChange={e => handleInputChange(e.target.value)}/>
            </div>
            <Button onClick={addNewNote}>
                <PlusCircleOutlined /> Add new note
            </Button>
            <div className="main-container">
                {notesLoading ? <Skeleton active/> : notes.map(e => <Card
                    // hoverable
                    style={{ width: 240 }}
                    actions={[
                        <EditFilled key="edit" onClick={() => handleCardClick(e)}/>,
                        <DeleteFilled key="delete" onClick={() => deleteNote(e._id)}/>
                    ]}
                    // cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                  >
                    <Meta title={e.title} description={e.desc} />
                  </Card>)
                }
            </div>
            {activeNote && mode && <Modal
                title={null}
                closable={false}
                visible={visible}
                okText={mode === "edit" ? "Update" : "Save"}
                onOk={() => mode === "edit" ? updateNote() : addNote()}
                onCancel={() => setVisible(false)}
                destroyOnClose
            >
                <div className="edit-modal">
                    <Space direction="vertical" size="middle">
                        <Input
                            ref={titleRef}
                            placeholder="Enter value"
                            defaultValue={mode === "edit" ? activeNote.title : ""}
                        />
                        <Input.TextArea
                            ref={descRef}
                            allowClear
                            autoSize={mode === "edit" ? true : false}
                            placeholder="Enter description"
                            defaultValue={mode === "edit" ? activeNote.desc : ""}
                            // onChange={onChange}
                        />
                    </Space>
                </div>
            </Modal>}
        </div>
    );
}