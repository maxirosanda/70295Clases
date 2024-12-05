import jwt from 'jsonwebtoken'

export const generateToken = (user) => jwt.sign({user},process.env.SECRET_JWT,{expiresIn:'24h'})

export const authToken = (req,res,next) => {

    const token = req.cookies.coderCookieToken

    if (!token) return res.status(401).send({ error: "Not authenticated" })

    jwt.verify(token,process.env.SECRET_JWT,(error,credentials)=>{
        if (error) return res.status(403).send({error: "Not authorized"})
        req.user = credentials.user
        next()
    })

}