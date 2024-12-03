import express from 'express'
import dotenv from 'dotenv'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import mongoose from 'mongoose'
import passport from 'passport'
import initializePassport from './src/config/passport.config.js'
import sessionRouter from './src/routes/sessionRouter.js'
import productRouter from './src/routes/productRouter.js'

dotenv.config()
const app = express()
app.use(express.json())
app.use('/static',express.static('public'))
app.use(session({
    store: MongoStore.create({
        mongoUrl:process.env.MONGO
    }),
    secret:process.env.SECRET_SESSION,
    resave:false,
    saveUninitialized:false,
    cookie:{
        secure:false,
        httpOnly:true
    }
}))
initializePassport()
app.use(passport.initialize())
app.use(passport.session())
app.use('/api/session',sessionRouter)
app.use('/api/products',productRouter)


mongoose.connect(process.env.MONGO)
app.listen(process.env.PORT,()=> console.log('server in port ' + process.env.PORT))