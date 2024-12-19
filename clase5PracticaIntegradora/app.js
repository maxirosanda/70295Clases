import express from 'express'
import dotenv from 'dotenv'
import usersRoutes from './src/routes/users.routes.js'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import initializePassport from './src/config/passport.config.js'
import passport from 'passport'
import productsRoutes from './src/routes/products.routes.js'
import cors from 'cors'
import { Command } from "commander"
//import { fork } from 'child_process'

const program = new Command()
program.option("--mode <mode>","Mode de trabajo","development").parse()
program.parse()
dotenv.config({
    path: program.opts().mode ==="development" ? "./.env.development" : "./.env"
})

const app = express({})
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


/* //ejemplo fork (en proyecto final borrar)
function operacionCompleja() {
    let result = 0;

    for (let i = 0; i < 5e9; i++) {
        result += i;
    }
    return result;
}
app.get('/sumalenta', (req, res) => {
    const result = operacionCompleja()
    res.send(`El resultado de la operación es ${result}`)
})



app.get('/suma', (req, res) => {
    const child = fork('./operacionCompleja.js')
    child.send("!Inicia el calculo")
    child.on('message', result => {
        res.send(`El resultado de la operación es ${result}`)
    })
   
})

let visitas = 0
app.get('/hola', (req, res) => {
    visitas++
    res.send(`Hola! Esta ruta ha sido visitada ${visitas} veces.`)
})


*/

app.use('/api/users',usersRoutes)
app.use('/api/products',productsRoutes)
mongoose.connect(process.env.MONGO)                                                                                                                            
app.listen(process.env.PORT,()=> console.log('server in port: ' + process.env.PORT))