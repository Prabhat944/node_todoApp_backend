import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:[3,"Name should be at least 3 characters long"],
    },
    email:{
        type:String,
        unique: true, 
        required:true,
    },
    password:{
        type:String,
        minlength:[6,"Password should be at leat 6 character long"],
        select:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

export const User = mongoose.model('user', userSchema);