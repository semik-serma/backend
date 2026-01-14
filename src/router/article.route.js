import express from 'express'
import { article, updateartcle } from '../controller/article.controller.js'


export const articleRoute=express.Router()

articleRoute.post('/createarticle',article)
articleRoute.get('/updatearticle/:id',updateartcle)


