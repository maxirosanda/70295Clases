import { Router } from "express"
import productModel from "../models/product.model.js"
import { authorization } from "../middlewares/authorization.js"

const router = Router()

router.get('/',authorization("user"),async (req,res) => {
    const products = await productModel.find({})
    res.status(200).json(products)
})
export default router