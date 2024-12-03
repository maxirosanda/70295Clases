import { Router } from "express"
import userModel from "../models/userModel.js"
import { auth } from "../middleware/authSession.js"
import { createHash, isValidPassword } from "../utils.js"

const router = Router()


router.post('/register',async (req,res)=>{

    try {
        const {firstName, lastName, age, email, password} = req.body

        const existUser = await userModel.findOne({email})
        if(existUser) return res.status(400).send({status:'user exist'})

        const newUser = {
            firstName,
            lastName,
            age,
            email,
            password:createHash(password)
        }
        const result = await userModel.create(newUser)
        req.session.firstName = result.firstName
        req.session.lastName = result.lastName
        req.session.age = result.age
        req.session.role = result.role
        res.status(200).send({status:'register success'})
    } catch (error) {
        res.send("error")
    }
    
})

router.post('/login',async (req,res)=>{
    try {
        const {email,password} = req.body
        const user = await userModel.findOne({email})
        if(!user) return res.status(400).send({status:"user doesn't exist"})
        if(!isValidPassword(user,password)){
            return res.status(403).send({ status: 'error', error: 'Password incorrecto' })
        }

        req.session.firstName = user.firstName
        req.session.lastName = user.lastName
        req.session.age = user.age
        req.session.role = user.role
        
        res.status(200).send({status:'login success'})
    } catch (error) {
        res.send("error")
    }
    
})

router.delete('/logout',(req,res)=>{
    req.session.destroy(err => {
        if(!err) res.send({status:"logout ok"})
        else res.send({ status: 'Logout ERROR', body: err })
    })
})

router.patch('/reset-password', async (req,res)=>{
    const { email, password} = req.body

    if (!email || !password) {
        return res.status(400).send({ status: 'error', message: 'Missing required fields' })
    }

    try {

        const user = await userModel.findOne({email})
        if (!user) return res.status(401).send('Usuario no encontrado')
        await userModel.updateOne({ _id: user._id },{ $set:{ password:createHash(password)}})
        req.session.firstName = user.firstName
        req.session.lastName = user.lastName
        req.session.age = user.age
        req.session.role = user.role
        res.send('Resteo de password exitoso')

    } catch (error) {
        res.status(500).send('Error al reiniciar contraseña')
    }
})
router.get('/profile',auth,(req,res)=>{
    const firstName= req.session.firstName
    const lastName = req.session.lastName
    const age = req.session.age
    res.status(200).send({status:"ok",payload:{firstName,lastName,age}})
})

export default router