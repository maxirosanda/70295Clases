import express from 'express'
import dotenv from 'dotenv'
import usersRoutes from './src/routes/users.routes.js'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import initializePassport from './src/config/passport.config.js'
import passport from 'passport'
import productsRoutes from './src/routes/products.routes.js'
import cors from 'cors'

dotenv.config()
const app = express({

})
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true,
    methods:['GET','POST'],
    allowedHeaders: ['Content-Type']
}))
app.use('/static',express.static('public'))
app.use(express.json())
app.use(cookieParser())
initializePassport()
app.use(passport.initialize())

app.use('/api/users',usersRoutes)
app.use('/api/products',productsRoutes)
mongoose.connect(process.env.MONGO)
app.listen(process.env.PORT,()=> console.log('server in port: ' + process.env.PORT))