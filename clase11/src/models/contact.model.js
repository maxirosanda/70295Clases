import mongoose from "mongoose"

const contactSchema = mongoose.Schema({
    firstName:String,
    lastName:String,
    fullName:String,
    active:Boolean
})

export default mongoose.model('contact',contactSchema)