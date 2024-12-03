import { Router } from "express"
import userModel from "../models/userModel.js"
import { auth } from "../middleware/authSession.js"
import { createHash, isValidPassword } from "../utils.js"
import passport from "passport"

const router = Router()


router.post('/register',passport.authenticate('register',{failureRedirect:'/api/session/failRegister'}),(req,res)=>{

    req.login(req.user,(error)=>{
        if(error){
            return res.status(500).send({ status: "error", message: "Error al iniciar sesión después del registro" })
        }
        res.send({ status: "register success", message: "User registered and logged in" })
    })
    
    
})

router.get('/failregister', (req, res) => {
    res.send({ error: "Failed"})
})

router.post('/login',passport.authenticate('login',{failureRedirect:'/api/session/failLogin'}),async (req,res)=>{
  
    if (!req.user) return res.status(400).send({ status: "error", error: "Invalid credentials" })
    res.send({ status: "login success"})
})

router.get('/faillogin', (req, res) => {
    res.send({ error: "Failed Login" })
})



router.get('/logout', (req, res) => {
    
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Error al cerrar sesión" });
      }
      res.send('deslogiado')
    })
  })

router.get('/profile',auth,(req,res)=>{
    const firstName= req.user.firstName
    const lastName = req.user.lastName
    const age = req.user.age
    res.status(200).send({status:"ok",payload:{firstName,lastName,age}})
})

export default router