import { Contact } from "../models/contactModels.js";
import { errorResponse, successResponse } from "../utils/response.js";

export const contactus=async(req,res)=>{
    const {name,sub,message}=req.body
    if(!name){
        return errorResponse(res,'pls enter your name')
    }
    if(!sub){
        return errorResponse(res,'pls enter your subject')
    }
    if(!message){
        return errorResponse(res,'pls enter your message')
    }
    const contactcreate=await Contact.create({name:name,sub:sub,message:message})
    successResponse(res,'successfully created')
}