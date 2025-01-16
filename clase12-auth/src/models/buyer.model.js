import mongoose from "mongoose"

const buyerSchema = mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    role:{
        type:String,
        default:"buyer"
    },
    password:String,
    orders:[
        {
            type:mongoose.SchemaTypes.ObjectId,
            ref:"orders"
        }
    ]

})

export default mongoose.model('buyers',buyerSchema)