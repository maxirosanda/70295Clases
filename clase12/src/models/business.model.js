import mongoose from "mongoose"

const bussinesSchema = mongoose.Schema({
    name:String,
    products:[]
})

export default mongoose.model('business',bussinesSchema)