import React from 'react'
import {Form, Input, Button} from 'antd'

const DetailModal = (props) => {
    const { mode, activeNote, addNote, updateNote} = props

    const onFinish = (values) => {
        // console.log('Success:', values)
        if (mode === "edit") {
            updateNote(
                values.title,
                values.desc,
                activeNote
            )
        }
        else {
            addNote(
                values.title,
                values.desc
            )
        }
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo)
    }
    return (
        <>
            <Form
                // {...layout}
                name="basic"
                initialValues={{ 
                    title: mode === "edit" ? activeNote.title : "",
                    desc: mode === "edit" ? activeNote.desc : "",
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input
                        // ref={titleRef}
                        placeholder="Enter value"
                        style={{width: '60%'}}
                        // defaultValue={mode === "edit" ? activeNote.title : ""}
                    />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="desc"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.TextArea
                        // ref={descRef}
                        style={{width: '60%'}}
                        allowClear
                        autoSize={mode === "edit" ? true : false}
                        placeholder="Enter description"
                        // defaultValue={mode === "edit" ? activeNote.desc : ""}
                        // onChange={onChange}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        {mode === "edit" ? "Update" : "Save"}
                    </Button>
                </Form.Item>
            </Form>
            {/* <Space direction="vertical" size="middle">
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
            </Space> */}
            {/* <div>
                <Button 
                    onClick={() => {
                        if (mode === "edit") {
                            updateNote(
                                form.getFieldValue('title'),
                                form.getFieldValue('desc'),
                                activeNote
                            )
                        }
                        else {
                            addNote(
                                form.getFieldValue('title'),
                                form.getFieldValue('desc')
                            )
                        }
                    }}
                >
                    {mode === "edit" ? "Update" : "Save"}
                </Button>
            </div> */}
        </>
    )
}

export default DetailModal