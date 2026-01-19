import mongoose from "mongoose";


const visitcountSchema=new mongoose.Schema({
    visitor:{type:String,unique:true},
})

export const visitcount=mongoose.model('visitcount',visitcountSchema)