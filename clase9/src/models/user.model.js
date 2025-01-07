import mongoose from "mongoose"


const userSchema = mongoose.Schema({
    name:String,
    age:Number
})

export default mongoose.model('user',userSchema)