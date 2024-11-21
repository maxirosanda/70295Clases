import { Router } from "express"
import userModel from "../models/userModel.js"

const router = Router()

router.get('/',async (req,res)=>{
    try {
        const result = await userModel.find({})
        res.send({status:'success',payload:result})
    } catch (error) {
        res.status(400).send({status:'error',message:error.message})
    }
})

router.post('/',async (req,res)=>{

   try {

    const {name, age, email } = req.body

    const newUser = {
        name,
        age,
        email
    }
    const result = await userModel.create(newUser)
    res.send({status:'user Created',payload:result})

   } catch (error) {

    res.status(400).send({status:'error',message:error.message})

   }

})

router.patch('/:id',async (req,res)=>{

    try {
     const { id } = req.params
     const {name, age, email } = req.body
 
     const data = {
         name,
         age,
         email
     }

     const result = await userModel.updateOne({_id:id},data)
     res.send({status:'user updated',payload:result})
 
    } catch (error) {
 
     res.status(400).send({status:'error',message:error.message})
 
    }
 
 })

 router.delete('/:id',async (req,res)=>{

    try {
     const { id } = req.params
 
     const result = await userModel.deleteOne({_id:id})
     res.send({status:'user deleted',payload:result})
 
    } catch (error) {
 
     res.status(400).send({status:'error',message:error.message})
 
    }
 
 })
 

export default router