import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    
    firstName:String,
    lastName:String,
    age:{
        type:Number,
        default:0
    },
    email:{
        type:String,
        default:""
    },
    role:{
        type:String,
        default:'user'
    },
    password:{
        type:String,
        default:""
    },
    id_github:{
        type:String,
        default:""
    }

})

export default mongoose.model('users',userSchema)