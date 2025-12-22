import express from 'express';  
import { connectdb } from './src/config/db.js';
import cors from 'cors'
import route from './src/router/auth.route.js';

const app=express()
app.use(express.json())
app.use(cors())
connectdb()
app.use('/auth',route)




app.listen(2000,()=>{
    console.log('server started successfully')
})