import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { authToken, generateToken } from './utils.js'

dotenv.config()
const app = express()
app.use(express.json())
app.use(cookieParser())

const users = []

app.post('/register',(req,res)=>{

    const { name, email, password } = req.body
    const exists = users.find(user => user.email === email)
    if (exists) return res.status(400).send({ status: "error", error: "User already exists" })
    const user = {
        name,
        email,
        password
    }
    users.push(user)
    const access_token = generateToken(user)
    res.cookie('coderCookieToken',access_token,{
        maxAge:60*60*24,
        httpOnly:true,
        secure:false
    }).send({ message: "Logged in!" })



})
app.post('/login',(req,res)=>{
    const { email, password } = req.body
    const user = users.find(user => user.email === email && user.password === password)
    if (!user) return res.status(400).send({ status: "error", error: "Invalid credentials" })
    const access_token = generateToken(user)
    res.cookie('coderCookieToken',access_token,{
        maxAge:60*60*24,
        httpOnly:true,
        secure:false
    }).send({ message: "Logged in!" })

})

app.get('/logout',(req,res)=>{
    res.clearCookie('coderCookieToken').send({ message: "Logged out successfully!" })
})

app.get('/current',authToken, (req, res) => {
    res.send({ status: "success"})
})


app.listen(process.env.PORT, () => console.log("Listening on " + process.env.PORT))



