
export const auth = (req,res,next) => {
    if(!req.session){
        return res.status(401).send('usuario no autenticado')
    }
    if(req.session.role === "user" || req.session.role === "admin"){
        return next()
    }
    return res.status(401).send('usuario no identificado')
}

export const authAdmin = (req,res,next) => {
    if(!req.session){
        return res.status(401).send('usuario no autenticado')
    }
    if(req.session.role === "admin"){
        return next()
    }
    return res.status(401).send('usuario no identificado')
}