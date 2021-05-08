import React from 'react'
import express from 'express'
import fs from 'fs'
import path from 'path'
import ReactDOMServer from 'react-dom/server'
import App from '../src/App'

const app = express()
const PORT = 8000

app.use('^/$', (req, resp, next) => {
    fs.readFile(path.resolve('./build/index.html'), 'utf-8', (error, data) => {
        if (error) {
            console.log(error)
            return resp.status(500).send('error happend')
        }
        return resp.send(
            data.replace(
                '<div id="root"></div>',
                `<div id="root">${ReactDOMServer.renderToString(<App/>)}</div>`
            )
        )
    })
})

app.use(express.static(path.resolve(__dirname, '..', 'build')))

app.listen(PORT, () => {
    console.log(`listening at port: ${PORT}`)
})