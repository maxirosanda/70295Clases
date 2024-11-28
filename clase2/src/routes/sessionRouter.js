import { Router } from "express"
import userModel from "../models/userModel.js"
import { auth } from "../middleware/authSession.js"

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
            password
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
        const user = await userModel.findOne({email,password})
        if(!user) return res.status(400).send({status:"user doesn't exist"})

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

router.get('/profile',auth,(req,res)=>{
    const firstName= req.session.firstName
    const lastName = req.session.lastName
    const age = req.session.age
    res.status(200).send({status:"ok",payload:{firstName,lastName,age}})
})

export default router