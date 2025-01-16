import { Router } from "express"
import { getBusiness, getBusinessById, createBusiness, addProduct } from "../controllers/business.controller.js"


const router = Router()

router.get('/',getBusiness)
router.post('/',createBusiness)
router.get('/:id',getBusinessById)
router.post('/:id/product',addProduct)

export default router