import express from 'express'
import { contactus } from '../controller/contact.controller.js'

export const contactroute=express.Router()

contactroute.post('/contact',contactus)


