import { Comment } from "../models/commentModels.js";
import { successResponse } from "../utils/response.js";
import User from "../models/userModels.js";

export const comment=async(req,res)=>{
     
    try {
         if(!req.body){
            return res.status(400).json({
                message:"error at req.body",
                error:error.message
            })
        }
        const {comment}=req.body
       
        if(!comment){
            return
        }
        if(comment){
        const commentcreate=await Comment.create({ comment:comment })
        console.log(comment)
        successResponse(res,'commented successfully')       
        }
        
    } catch (error) {
        console.log('error at comment')
        return res.status(400).json({
            message:"error at comment creating",
            error:error.message
        })
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
   
export const usercommentname=async(req,res)=>{
    try {
        const {email}=req.body
        const findemail=await User.findOne({email})
        successResponse(res,'found users email')
    } catch (error) {
        console.log('error at comment')
    }
}
