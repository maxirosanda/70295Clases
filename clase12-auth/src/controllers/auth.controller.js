import { generateToken } from "../utils/generateToken.js"

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