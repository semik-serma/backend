import { otpmodel } from "../models/otpModel.js";
import User from "../models/userModels.js";
import { otpgenerate } from "../utils/generateOtp.js";
import { sendmail } from "../utils/mailer.js";
import { errorResponse, successResponse } from "../utils/response.js";


export const registerFirst=async(req,res)=>{
    try {
        const {firstname,lastname,email,password,role}=req.body
        if(!firstname){
            return errorResponse(res,'pls enter your firstname')
        }
        if(!lastname){
            return errorResponse(res,'pls enter yuour lastname')
            
        }
        if(!email){
            return errorResponse(res,'pls enter your email')
        }
        if(!password){
           return errorResponse(res,'pls enter your password')
        }
        const userexists=await User.findOne({ email })
        if(userexists){
            return res.status(400).json({
                message:"email already exists"
            })
        }


    } catch (error) {
        res.status(400).json({
            message:"error at register",
            error:error.message
        })
    }
}
export const registerSecond=async(req,res)=>{
    try {
        const email=req.body.email
        if(!email){
            return errorResponse(res,'email required')
        }
        const emailotp=await otpmodel.findOne({ email })
        if(emailotp){
            return errorResponse(res,'sendmail after 5 minute')
        }
        const otp=otpgenerate()
        const create=await otpmodel.create({
            email:email,
            otp:otp
        })
        await sendmail(email,otp)
        successResponse(res,'This opt expires at 5 minute go and verify',otp)
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message:'error at register second',
            error:error.message
        })
    }
}
const verifyuser=async(req,res)=>{
    try {
        const {email,password,otp,firstname,lastname}=req.body
        if(!email){
            return errorResponse(res,'pls enter your email') 
            
        }
        if(!password){
            return errorResponse(res,'pls enter your password')
        }
        if(!otp){
            return errorResponse(res,'find you otp')
        }
        const findemail=await User.findOne({ email,otp,isUsed:false})
        if(!findemail){
            return errorResponse(res,'cant find') 
        }
        await otpmodel.findOneAndUpdate({ email },{ isUsed:true })
        await User.create({
            email:email,
            password:password,
            firstname:firstname,
            lastname:lastname
        })
        successResponse(res,'user created successfully')

    } catch (error) {
        res.status(400).json({
            message:"error at verifyuser",
            error:error.message
        })
    }
}