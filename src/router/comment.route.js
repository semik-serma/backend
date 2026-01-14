import express from 'express'

import { comment, displaycomment } from "../controller/comment.controller.js";



export const commentroute=express.Router()

commentroute.post('/comment',comment)
commentroute.get('/commentget',displaycomment)
