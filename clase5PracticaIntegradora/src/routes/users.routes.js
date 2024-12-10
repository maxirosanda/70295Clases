import { Router } from "express"
import userModel from "../models/user.model.js"
import { createHash } from "../utils/hashingUtils.js"
import passport from "passport"
import { generateToken } from "../utils/generateToken.js"
import { authorization } from "../middlewares/authorization.js"

const router = Router()

router.post('/register',passport.authenticate('register',{session:false,failureRedirect:'/api/users/failRegister'}),async (req,res)=>{

    try {

        if(!req.user) return res.status(400).send("Registration failed")
        const token = generateToken(req.user)
        res.cookie('coderPracticaIntegrado',token,{httpOnly:true}).send('user registed')

    } catch (error) {
        res.status(400).send(error)
    }


})


router.post('/login',passport.authenticate('login',{session:false,failureRedirect:'/api/users/failLogin'}),async (req,res)=>{

    try {

        if(!req.user) return res.status(400).send("Registration failed")
        const token = generateToken(req.user)
        res.cookie('coderPracticaIntegrado',token,{httpOnly:true}).send('Ok login')

    } catch (error) {
        res.status(400).send(error)
    }


})

router.get('/logout', (req, res) => {

    res.clearCookie('coderPracticaIntegrado').json({ message: "Logout exitoso" })
    
})



router.get('/profile',passport.authenticate('jwt',{session:false}),authorization("admin"),(req,res)=>{
    
    const payload = {
        firstName:req.user.firstName,
        lastName:req.user.lastName
    }

    res.status(200).send(payload)
})

router.get('/github',passport.authenticate('github',{session:false}))

router.get('/githubcallback',passport.authenticate('github',{failureRedirect:"/api/users/failLogin",session:false}),(req,res)=>{
    
    try {

        if (!req.user) return res.status(401).json({ message: "Invalid credentials" })
        const token = generateToken(req.user)
        res.cookie('coderPracticaIntegrado', token, { httpOnly: true }).send('login ok')

    } catch (error) {

        res.status(400).send(error)

    }
})


export default router