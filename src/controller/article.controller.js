import { Article } from "../models/articleModels.js";
import { errorResponse, successResponse } from "../utils/response.js";

export const article=async(req,res)=>{
    const {title,content,auther,image}=req.body
    if(!title){
        return errorResponse(res,'pls enter a suitable title')
    }
    if(!content){
        return errorResponse(res,'pls enter a suitable content')
    }
    if(!auther){
        return errorResponse(res,'pls enter your name')
    }
    if(!image){
        return errorResponse(res,'pls select your image')
    }
    const createarticle=await Article.create({
        title:title,
        content:content,
        auther:auther,
        image:image
    })
    console.log(createarticle)
    successResponse(res,'successfully created article')
}