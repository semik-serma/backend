import mongoose from "mongoose";    

const otpmodelschema=new mongoose.Schema({
    otp:{type:String},
    email:{type:String},
    isUsed:{type:Boolean,default:false},            
    createdAt:{type:Date,default:Date.now,expires:300},
})
export const otpmodel=mongoose.model('otpmodel',otpmodelschema)