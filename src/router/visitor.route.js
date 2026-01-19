import express from 'express'
import { visitcounter, visitorcounterget } from '../controller/visitor.controller.js'



export const visitorroute=express.Router()

visitorroute.post('/',visitcounter)
visitorroute.get('/',visitorcounterget)