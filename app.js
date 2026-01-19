import express from 'express';  
import { connectdb } from './src/config/db.js';
import cors from 'cors'
import route from './src/router/auth.route.js';
import { commentroute } from './src/router/comment.route.js';
import { countrydetect } from './src/router/countrydetect.route.js';
import Articleroute from './src/router/article.route.js';
import { contactroute } from './src/router/contact.route.js';
import { visitcounter } from './src/controller/visitor.controller.js';
import { visitorroute } from './src/router/visitor.route.js';

const app=express()
app.use(express.json())
app.use(cors({origin:['http://localhost:3000','https://frontend-mu.vercel.app/'],credentials:true}))
connectdb()
app.use('/auth',route)
app.use('/article',Articleroute)
app.use('/',commentroute)
app.use('/countrydetect',countrydetect)
app.use('/contact',contactroute)
app.use('/visit',visitorroute)




app.listen(2000,()=>{
    console.log('server started successfully')
})