import express from 'express';  
import { connectdb } from './src/config/db.js';
import cors from 'cors'
import route from './src/router/auth.route.js';
// import { articleRoute } from './src/router/article.route.js';
import { commentroute } from './src/router/comment.route.js';
import { countrydetect } from './src/router/countrydetect.route.js';
import Articleroute from './src/router/article.route.js';
import { contactroute } from './src/router/contact.route.js';

const app=express()
app.use(express.json())
app.use(cors())
connectdb()
app.use('/auth',route)
app.use('/article',Articleroute)
app.use('/',commentroute)
app.use('/countrydetect',countrydetect)
app.use('/',contactroute)




app.listen(2000,()=>{
    console.log('server started successfully')
})