import { Comment } from "../models/commentModels.js";
import { successResponse } from "../utils/response.js";

export const comment=async(req,res)=>{
    try {
        const {comment}=req.body
        const commentcreate=await Comment.create({ comment:comment })
        successResponse(res,'commented successfully')
    } catch (error) {
        console.log('error at comment')
    }
}
export const displaycomment = async (req,res)=>{
    try{
        const comments = await Comment.find().sort({createdAt:-1})
        res.status(200).json(comments)
    }catch(err){
        res.status(500).json({message:"failed to load comments"})
    }
}
   