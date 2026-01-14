import multer from 'multer'
import express from 'express'

const app = express()
const upload = multer()

app.post('/profile', upload.single('avatar'), (req, res, next) => {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
})

app.post('/photos/upload', upload.array('photos', 12), (req, res, next) => {
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
})