import React, {useState, useEffect} from 'react';
import {Input, Card, Skeleton, Modal, Button} from 'antd';
import {PlusCircleOutlined, DeleteFilled, EditFilled} from '@ant-design/icons';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getAllNotes, addNote, deleteNote, updateNote, setModalVisible } from './redux/actions.js'
import './App.scss';
import DetailModal from './components/modal.js';

const { Meta } = Card;

const App = (props) => {
    
    const { notes, notesLoading, getAllNotes, addNote, deleteNote, updateNote, visible, setModalVisible } = props
    // const [visible, setModalVisible] = useState(false);
    const [activeNote, setActiveNote] = useState(null);
    const [mode, setMode] = useState(null)
    // const titleRef = useRef()
    // const descRef = useRef()

    useEffect(() => {
        getAllNotes()
    }, []) 

    const handleCardClick = e => {
        setModalVisible(true)
        setMode("edit")
        setActiveNote(e)
    }

    const addNewNote = () => {
        setModalVisible(true)
        setMode("add")
        setActiveNote({title: "", desc: ""})
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
            {/* {activeNote && mode &&  */}
            <Modal
                title={null}
                // closable={false}
                visible={visible}
                destroyOnClose={true}
                footer={null}
                onCancel={() => setModalVisible(false)}
            >
                {/* <div className="edit-modal"> */}
                    <DetailModal 
                        mode={mode}
                        activeNote={activeNote}
                        updateNote={updateNote}
                        addNote={addNote}
                        setModalVisible={setModalVisible}
                    />
                {/* </div> */}
            </Modal>
            {/* } */}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        notes: state.notes,
        notesLoading: state.loading,
        visible: state.modalVisible
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ 
        getAllNotes,
        addNote,
        deleteNote,
        updateNote,
        setModalVisible
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)