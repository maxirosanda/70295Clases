
export const auth = (req,res,next) => {

    if(!req.isAuthenticated()){
        return res.status(401).send('error de autorización!')
    }
    if (req.user?.role === 'admin'  || req.user?.role == 'user') {
        return next()
    }

}

export const authAdmin = (req,res,next) => {
    if(!req.isAuthenticated()){
        console.log("hola")
        return res.status(401).send('error de autorización!')
    }
    if (req.user?.role === 'admin') {
        return next()
    }
    return res.status(401).send('error de autorización!')
    
}