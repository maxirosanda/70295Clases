import { Router } from "express"
import { getOrders, createOrder, resolveOrder, getOrderById } from "../controllers/orders.controller.js"


const router = Router()

router.get('/',getOrders)
router.get('/:id',getOrderById)
router.post('/',createOrder)
router.post('/:id',resolveOrder)

export default router