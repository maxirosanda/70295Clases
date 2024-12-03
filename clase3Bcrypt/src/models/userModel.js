import mongoose, { Schema } from "mongoose"

const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        default:0
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        default:'user'
    },
    password:{
        type:String,
        required:true
    }
})

export default mongoose.model('users',userSchema)