import { notification } from 'antd'

export const notify = (type, message, description, duration) => {
    notification[type]({
        message,
        description,
        duration,
    })
}

export const baseUrl = "https://sheltered-taiga-65593.herokuapp.com/"
// export const baseUrl = "http://localhost:3005/"