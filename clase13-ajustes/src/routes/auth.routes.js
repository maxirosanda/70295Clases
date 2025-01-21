import { Router } from "express"
import {login, logout, register, github, passwordReset } from "../controllers/auth.controller.js"
import { passportCall } from "../utils/passportCall.js"
import passwordResetModel from "../models/passwordReset.model.js"
import buyerModel from "../models/buyer.model.js"
import { createHash } from "../utils/hashingUtils.js"

const router = Router()

router.post('/register',passportCall("register"),register)
router.post('/login',passportCall("login"),login)
router.get('/logout',logout)
router.get('/github',passportCall('github'))
router.get('/githubcallback',passportCall('github'),github)
router.post('/passwordReset',passwordReset)
router.post('/reset', async (req, res) => {  // Cambiar a POST
    const { email, resetToken } = req.query;
    const { password } = req.body;

    if (!password || !email || !resetToken) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const passwordHash = createHash(password);  // Asegúrate de tener la función createHash implementada correctamente

    try {
        // Buscar el documento con el email
        const response = await passwordResetModel.findOne({ email });
        
        if (!response) {
            return res.status(404).json({ message: "User not found" });
        }

        // Verificar si el resetToken es válido y no ha expirado
        if (response.resetToken !== resetToken) {
            return res.status(400).json({ message: "Invalid reset token" });
        }

        // Asegúrate de que el token no haya expirado (si estás utilizando TTL)
        if (new Date() - new Date(response.createdAt) > 900000) {  // 900000 ms = 15 minutos
            return res.status(400).json({ message: "Reset token has expired" });
        }
        const user = {
            password: passwordHash
        };

        // Actualizar la contraseña del usuario en buyerModel
        await buyerModel.updateOne({ email }, { $set: user })
   
        res.json({ message: "Password successfully reset" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
});

export default router