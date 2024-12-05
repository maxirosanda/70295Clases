import { Router } from "express"
import { auth,authAdmin } from "../middleware/authMiddleware.js"

const router = Router()

router.get('/',auth, (req, res) => {

    const productos = [
        { id: 1, nombre: 'Producto 1' },
        { id: 2, nombre: 'Producto 2' }
    ]
    res.json([{ user: req.user }, productos])
})

router.get('/privado', authAdmin, (req, res) => {
    res.send('si estas viendo esto es porque ya te logueaste y sos admin!')
})

export default router