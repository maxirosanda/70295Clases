import { Router } from "express"
import passport from "passport"

const router = Router()

router.get('/github', passport.authenticate('github'))

router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/faillogin' }), async (req, res) => {
    res.send('logeado con github');
})

router.get('/faillogin', (req, res) => {
    res.send({ error: "Failed Login" })
  })



export default router