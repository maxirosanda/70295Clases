import mongoose from "mongoose"

const ordersSchema = mongoose.Schema({
    business:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"business"
    },
    buyer:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"buyers"
    },
    products:[],
    status:String,
    totalPrice:Number
})

export default mongoose.model('orders',ordersSchema)