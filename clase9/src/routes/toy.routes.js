import { Router } from "express"
import { toyController } from "../controllers/toy.controller.js"

const router = Router()

router.get('/',toyController.getToys)
router.post('/',toyController.createToy)
router.patch('/:id',toyController.updateToy)
router.delete('/:id',toyController.deleteToy)

export default router