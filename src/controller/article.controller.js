import { Article } from "../models/articleModels.js";
import { errorResponse, successResponse } from "../utils/response.js";

export const article=async(req,res)=>{
    const {title,content,author,image}=req.body
    if(!title){
        return errorResponse(res,'pls enter a suitable title')
    }
    if(!content){
        return errorResponse(res,'pls enter a suitable content')
    }
    if(!author){
        return errorResponse(res,'pls enter your name')
    }
    if(!image){
        return errorResponse(res,'pls select your image')
    }
    const createarticle=await Article.create({
        title:title,
        content:content,
        auther:author,
        image:image
    })
    console.log(createarticle)
    successResponse(res,'successfully created article')
}

export const updateartcle=async(req,res)=>{
    const {id}=req.params
    const {title,content,author,image}=req.body
    if(!title){
        return errorResponse(res,'pls enter your title')
    }
    if(!content){
        return errorResponse(res,'pls enter your content')
    }
    if(!author){
        return errorResponse(res,'pls enter your name')
    }
    if(!image){
        return errorResponse(res,'pls select your image')
    }
    const findbyid=await Article.findOneAndUpdate(id,{title,content,author,image},{new:true})
    successResponse(res,'article updated successfully')
}