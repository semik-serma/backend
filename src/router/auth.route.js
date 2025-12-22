import express from 'express'
import { registerFirst, registerSecond } from '../controller/auth.controller.js'

const route=express.Router()
route.post('/register',registerSecond)
route.post('/registerroute',registerFirst)


export default route