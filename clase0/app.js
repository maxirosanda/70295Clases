import express from 'express'
import userRouter from './src/routes/userRouter.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
app.use(express.json())


app.use('/api/users',userRouter)
mongoose.connect(process.env.MONGO)
app.listen("8080",console.log("server in port: 8080"))