import { Router } from "express"
import { getOrders, createOrder, resolveOrder, getOrderById, getOrderByBuyer, getOrderByBusiness } from "../controllers/orders.controller.js"
import passport from "passport"
import {authorization} from "../middlewares/authorization.js"
import {passportCall} from "../utils/passportCall.js"

const router = Router()
router.use(passportCall("jwt"))

router.get('/',authorization(["admin"]), getOrders)
router.get('/:id',authorization(["buyer","business"]),getOrderById)
router.get('/buyer/:idBuyer',authorization(["buyer","business"]),getOrderByBuyer)
router.get('/business/:idBusiness',authorization(["buyer","business"]),getOrderByBusiness)
router.post('/',authorization(["buyer"]),createOrder)
router.post('/:id',authorization(["business"]),resolveOrder)

export default router