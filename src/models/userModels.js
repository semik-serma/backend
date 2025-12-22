import mongoose from 'mongoose';


const  Registerschema=new mongoose.Schema({
    firstname:{type:String},
    lastname:{type:String},
    email:{type:String},
    password:{type:String},
    role:{type:String,default:'USER',enum:['ADMIN','USER'],uppercase:true}
})
const User=mongoose.model('User',Registerschema)

export default User