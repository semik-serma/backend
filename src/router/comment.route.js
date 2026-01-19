import express from 'express';
import { 
  beforelogincomment,  // Changed from beforelogindisplaycomment
  beforelogindisplaycomment, 
  beforelogincommentgetById,
  usercommentname,
  afterlogincomments,
  afterlogincommentget,
  afterlogincommentgetById 
} from "../controller/comment.controller.js";

export const commentroute = express.Router();

// FIX: Changed from beforelogindisplaycomment to beforelogincomment
commentroute.post('/comment', beforelogincomment);  
commentroute.get('/commentget', beforelogindisplaycomment);
commentroute.get('/beforelogincomment/:id', beforelogincommentgetById);
commentroute.get('/useremail', usercommentname);
commentroute.post('/afterlogincomment', afterlogincomments);
commentroute.get('/afterlogincommentsget', afterlogincommentget);
commentroute.get('/afterlogincomment/:id', afterlogincommentgetById);