import mongoose from 'mongoose';

export const connectdb=async()=>{
    try {
        await mongoose.connect('mongodb+srv://semikserma:semikserma@cluster0.dmkxhjw.mongodb.net/?appName=Cluster0') 
        console.log('db connected successfully')
    } catch (error) {
        console.log('error at connecting database')
    }
}