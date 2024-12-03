import { Router } from "express"
import { auth, authAdmin } from "../middleware/authSession.js"
import productModel from "../models/productModel.js"


const router = Router()

router.get('/',auth,async (req,res)=>{
    try {
        const product = await productModel.find({})
        res.send({status:"ok",payload:product})

    } catch (error) {
        res.send("error")
    }
    
})

router.post('/',authAdmin,async (req,res)=>{

    try {
        const {title,price,stock} = req.body
        const product = await productModel.create({title, price, stock})
        res.send({status:"product created",payload:product})

    } catch (error) {
        res.send("error")
    }
})


export default router