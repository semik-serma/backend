import express from 'express'
import { login, registerSecond, verifyuser } from '../controller/auth.controller.js'


const route=express.Router()
route.post('/register',registerSecond)
route.post('/verifyuser',verifyuser)
route.post('/loginuser',login)


export default route