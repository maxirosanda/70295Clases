import mongoose from "mongoose"

const buyerSchema = mongoose.Schema({
    name:String,
    email:String,
    role:{
        type:String,
        default:"buyer"
    },
    orders:[
        {
            type:mongoose.SchemaTypes.ObjectId,
            ref:"orders"
        }
    ]

})

export default mongoose.model('buyers',buyerSchema)