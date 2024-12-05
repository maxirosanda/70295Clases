import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        default:""
    },
    first_name: String,
    last_name:String,
    age:Number,
    password: String,
    role: { 
        type: String, 
        default: "user"
    },
    id_github:{
        type:String,
        default:""
    }
})
export default mongoose.model('User', userSchema)
