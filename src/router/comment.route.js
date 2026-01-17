import express from 'express'

import { comment, displaycomment,usercommentname } from "../controller/comment.controller.js";



export const commentroute=express.Router()

commentroute.post('/comment',comment)
commentroute.get('/commentget',displaycomment)
commentroute.get('/useremail',usercommentname)
