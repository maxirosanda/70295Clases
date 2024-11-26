import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import session from 'express-session'

dotenv.config()
const app = express()

app.use(express.json())
app.use(cookieParser(process.env.SECRET_COOKIE))
app.use(session({
    secret:process.env.SECRET_SESSION,
    resave:true,
    saveUninitialized:true
}))
app.use('/static',express.static('public'))

app.post('/cookie',(req,res)=>{
    const {name, modo} = req.body
    res.cookie('coderCookie',JSON.stringify({name,modo}),{maxAge:10000,signed:true}).send("cookie")
})

app.get('/cookie',(req,res)=>{
    console.log(req.signedCookies)
    res.send(req.signedCookies)
})

app.delete('/cookie',(req,res)=>{
    res.clearCookie('coderCookie').send('deleted cookie')
})

app.get('/session',(req,res)=>{
    if(req.session.counter){
        req.session.counter++
        res.send(`el usuario ${req.session.user} visito el sitio ${req.session.counter}` )
    }else{
        req.session.user = "maxi"
        req.session.counter = 1
        res.send(`Primer visita de: ${req.session.user}`)
    }
})

app.get('/logout',(req,res)=>{
    req.session.destroy(err =>{
        if(!err) res.send('logout')
        else res.send({status:"error",body:err})
    })
})

app.post('/login',(req,res)=>{
    const {email,password} = req.body
    if(email !== "maxi@gmail.com" || password != "aA123456"){
      return  res.send("login failed")
    }
    req.session.email = email
    req.session.admin = true
    res.send('login success')
})

const auth = (req,res,next) => {
    if(req.session?.email === "maxi@gmail.com" && req.session.admin === true){
        return next()
    }

    return res.status(401).send('error de autorizacion')
}

app.get('/privado',auth,(req,res)=>{
    res.send('usuario valido')
})

app.listen(process.env.PORT,() => console.log('server in port ' + process.env.PORT))