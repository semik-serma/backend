import { visitcount } from "../models/viewcountModels.js";


export const visitcounter=async(req,res)=>{
    try {
        const {visitor}=req.body
        const visitorcreate=await visitcount.create({visitor})
        const totaluser=await visitcount.countDocuments()
        res.status(200).json({message:"successfully created visitor",data:visitorcreate,totaluser})
        
    } catch (error) {
        console.log('error at visitcount')
        return res.status(400).json({
            message:"error at visitcount",
            error:error.message
        })
    }
}

export const visitorcounterget=async(req,res)=>{
    try {
        const totaluser=await visitcount.countDocuments()
        res.status(200).json({message:"successfully created visitor",data:totaluser})
    } catch (error) {
        res.status(400).json({
            message:"error at visitorcounterget",
            error:error.message
        })
    }
}
