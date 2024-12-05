import { Router } from "express"
import { auth } from "../middleware/authSession.js"
import passport from "passport"

const router = Router()


router.post('/register', passport.authenticate('register', { failureRedirect: '/api/session/failregister'}), async (req, res) => {
    req.login(req.user, (err) => {
        if (err) {
          return res.status(500).send({ status: "error", message: "Error al iniciar sesión después del registro" })
        }
        res.send({ status: "success", message: "User registered and logged in" })
    })
})

router.get('/failregister', (req, res) => {
    res.send({ error: "Failed"})
})

router.post('/login',passport.authenticate('login', { failureRedirect: '/api/session/faillogin' }),async (req, res) => {

        if (!req.user) return res.status(400).send({ status: "error", error: "Invalid credentials" })
        res.send({ status: "success", payload: req.user })
    })

router.get('/faillogin', (req, res) => {
    res.send({ error: "Failed Login" })
})

router.get('/github', passport.authenticate('github'))

router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/faillogin' }), async (req, res) => {
    res.send('logeado con github')
})



router.get('/logout', (req, res) => {
    
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Error al cerrar sesión" });
      }
      res.send('deslogiado')
    })
  })



router.get('/profile',auth,(req,res)=>{
  
    const firstName= req.user.firstName
    const lastName = req.user.lastName
    const age = req.user.age
    res.status(200).send({status:"ok",payload:{firstName,lastName,age}})
})

export default router