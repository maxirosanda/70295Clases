import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import passport from 'passport'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import sessionRoutes from './src/routes/sessionRoutes.js'
import initializePassport from './src/config/passport.config.js'
import productsRoutes from './src/routes/productsRoutes.js'

const app = express()
dotenv.config()
app.use(express.json())
app.use(session({
    store: MongoStore.create({
        mongoUrl:process.env.MONGO,
        ttl:60*60*24
    }),
    secret:process.env.SECRET_SESSION,
    resave:false,
    saveUninitialized:false
}))

initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.use('/api/session',sessionRoutes)
app.use('/api/products',productsRoutes)

mongoose.connect(process.env.MONGO)
app.listen(process.env.PORT,()=> console.log("server in port " + process.env.PORT))


