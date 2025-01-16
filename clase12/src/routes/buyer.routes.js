import { Router } from "express"
import { getBuyers, getBuyerById, saveBuyer } from "../controllers/buyer.controller.js"

const router = Router()

router.get('/',getBuyers)
router.get('/:id',getBuyerById)
router.post('/',saveBuyer)

export default router