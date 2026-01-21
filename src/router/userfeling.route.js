import express from 'express';
import { dislikecontroller, getdislikecontroller, getlikecontroller, likecontroller } from '../controller/userfeling.controller.js';

export const userfelingroute = express.Router();
userfelingroute.post('/like/:id', likecontroller)
userfelingroute.get('/getlikes/:id', getlikecontroller)
userfelingroute.post('/dislike/:id', dislikecontroller)
userfelingroute.get('/getdislike/:id', getdislikecontroller)

