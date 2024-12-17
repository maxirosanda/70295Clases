import { Router } from "express"
import productModel from "../models/product.model.js"
import { authorization } from "../middlewares/authorization.js"
import { passportCall } from "../utils/passportCall.js"

const router = Router()


router.param('category',async (req,res,next,category)=>{

    const regex = /^[a-zA-Z]{5,15}$/

    try {

       if(!regex.test(category)){
            return res.json({message:"Invalid parameters. Please provide a valid category"})
       }
       req.category = category
       next()
    } catch (error) {

        res.json(error)

    }

 
})

router.param('id', async (req, res, next, id) => {

    const regex = /^[a-fA-F0-9]{24}$/

    if (!regex.test(id)) {
        return res.send("Invalid ID format")
    }
    try {
        const product = await productModel.findOne({ _id: id })
        if (!product) {
            return res.send("Product not found")
        }
        req.product = product
        next()
    } catch (error) {
        res.sendServerError("Error validating the product ID")
    }
})


router.get('/',passportCall('jwt'),authorization("user"),async (req,res) => {
    const products = await productModel.find({})
    res.status(200).json(products)
})

/*([a-zA-Z]{5,15})*/

router.get('/category/:category',passportCall('jwt'),authorization("user"),async (req,res) => {
    const products = await productModel.find({category:{ $regex: category, $options: "i"}}) 
    res.status(200).json(products)
})

router.delete('/category/:category',passportCall('jwt'),authorization("user"),async (req,res) => {
    const {products,category} = req

    await productModel.deleteMany({category:{ $regex: category, $options: "i"}}) 
    res.status(200).json({ message: "Products deleted successfully" })
})


export default router