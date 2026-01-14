import express from 'express'
import { article } from '../controller/article.controller.js'


export const articleRoute=express.Router()

articleRoute.post('/createarticle',article)


