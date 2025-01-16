export const authorization = (role) => {

    return async (req,res,next) => {
        
        if(!req.user) return res.status(401).json({message:"Uniauthorized"})
         
         if(req.user.role === role) return next()
        return res.status(403).json({message:"No Permissions"})

    }
}