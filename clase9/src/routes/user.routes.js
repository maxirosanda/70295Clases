import { Router } from "express"
import { userController } from "../controllers/user.controller.js"

const router = Router()

router.get('/',userController.getUsers)
router.post('/',userController.createUser)
router.patch('/:id',userController.updateUser)
router.delete('/:id',userController.deleteUser)

export default router