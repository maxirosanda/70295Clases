import { Router } from "express"
import userModel from "../models/user.model.js"
import { createHash } from "../utils/hashingUtils.js"
import passport from "passport"
import { generateToken } from "../utils/generateToken.js"
import { authorization } from "../middlewares/authorization.js"
import { passportCall } from "../utils/passportCall.js"

const router = Router()

router.post('/register',passportCall('register'),async (req,res)=>{

    try {

        if(!req.user) return res.status(400).json({message:"Registration failed"})
        const token = generateToken(req.user)
        res.cookie('coderPracticaIntegrado',token,{httpOnly:true}).json({message:'user registed'})

    } catch (error) {
        res.status(400).json(error)
    }


})


router.post('/login',passportCall("login"),async (req,res)=>{

    try {

        if(!req.user) return res.status(400).json({message:"Registration failed"})
        const token = generateToken(req.user)
        res.cookie('coderPracticaIntegrado',token,{httpOnly:true}).json({message:'Ok login'})

    } catch (error) {
        res.status(400).json(error)
    }


})

router.get('/logout', (req, res) => {

    res.clearCookie('coderPracticaIntegrado').json({ message: "ok Logout" })
    
})



router.get('/profile',passportCall('jwt'),authorization("admin"),(req,res)=>{
    
    const payload = {
        firstName:req.user.firstName,
        lastName:req.user.lastName
    }

    res.status(200).send(payload)
})

router.get('/github',passportCall('github'))

router.get('/githubcallback',passportCall('github'),(req,res)=>{
    
    try {

        if (!req.user) return res.status(401).json({ message: "Invalid credentials" })
        const token = generateToken(req.user)
        res.cookie('coderPracticaIntegrado', token, { httpOnly: true }).send('login ok')

    } catch (error) {

        res.status(400).send(error)

    }
})


export default router