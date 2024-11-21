import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    }
})

export default mongoose.model('users',userSchema)