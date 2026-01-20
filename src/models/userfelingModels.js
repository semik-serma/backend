import mongoose from "mongoose";


const userfelingSchema=new mongoose.Schema({
    like:{type:String},
    dislike:{type:String}
})

export const userfelingModel=mongoose.model('userfeling',userfelingSchema)
