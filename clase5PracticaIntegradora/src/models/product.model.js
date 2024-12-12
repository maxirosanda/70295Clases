import mongoose from "mongoose"

const productSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    price:{
        type:Number,
        required:true
    },
    stock:{
        type:Number,
        required:true
    }
})

export default mongoose.model('products',productSchema)