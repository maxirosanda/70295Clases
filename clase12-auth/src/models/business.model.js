import mongoose from "mongoose"

const bussinesSchema = mongoose.Schema({
    fistName:String,
    lastName:String,
    email:String,
    password:String,
    role:{
        type:String,
        default:"business"
    },
    products:[]
})

export default mongoose.model('business',bussinesSchema)