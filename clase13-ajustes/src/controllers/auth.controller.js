import { generateToken } from "../utils/generateToken.js"
import passwordResetModel from "../models/passwordReset.model.js"
import { v4 as uuidv4 } from 'uuid';
import { transport } from "../config/transportEmail.js";

export const login = async (req, res) => {
    try {
        if (!req.user) return res.sendBadRequest("Registration failed")
        const token = generateToken(req.user)
        res.cookie('coderPracticaIntegrado', token, { httpOnly: true }).sendSuccess("Ok login")
    } catch (error) {
        res.sendServerError(error)
    }
}

export const register = async (req, res) => {
    try {
        if (!req.user) return res.sendBadRequest("Registration failed")
        const token = generateToken(req.user)
        res.cookie('coderPracticaIntegrado', token, { httpOnly: true }).sendCreated("User registered")
    } catch (error) {
        res.sendServerError(error)
    }
}

export const logout = (req, res) => {
    res.clearCookie('coderPracticaIntegrado').sendSuccess("Ok logout")
}

export const github = (req, res) => {
    try {
        if (!req.user) return res.sendUnauthorized({ message: "Invalid credentials" })
        const token = generateToken(req.user)
        res.cookie('coderPracticaIntegrado', token, { httpOnly: true }).sendSuccess({ message: 'Login ok' })
    } catch (error) {
        res.sendServerError(error)
    }
}

export const  passwordReset = async (req,res) => {
    const {email} = req.body
    const resetToken = uuidv4()
    const user = {
        email,
        resetToken
    }
    try {
        const result = await passwordResetModel.create(user)
         await transport.sendMail({
            from: 'Coder Tests maxirosanda@gmail.com',
            to: result.email,
            subject: 'Reset password',
            html: `
                <div>
                    <h1>en este email va el link con el formulario para agregar la contraseña</h1>
                </div>
            `,
            attachments: []
        })
        res.json({message:"success",result})
    } catch (error) {
        res.json(error)
    }
}

