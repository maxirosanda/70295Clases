import { Router } from "express"
import ContactController from "../controllers/contact.controller.js"

const router = Router()
const contactController = new ContactController()

router.get('/',contactController.getContact)
router.post('/',contactController.createContact)

export default router