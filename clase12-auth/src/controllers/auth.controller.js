import { generateToken } from "../utils/generateToken.js"


export const login = async (req,res)=>{

  try {

    if(!req.user) return res.status(400).json({message:"Registration failed"})
    const token = generateToken(req.user)
    res.cookie('coderPracticaIntegrado',token,{httpOnly:true}).json({message:'Ok login'})

  } catch (error) {
      res.status(400).json(error)
  }


}

export const register = async (req,res)=>{

  try {

    if(!req.user) return res.status(400).json({message:"Registration failed"})
    const token = generateToken(req.user)
    res.cookie('coderPracticaIntegrado',token,{httpOnly:true}).json({message:'user registed'})

} catch (error) {
    res.status(400).json(error)
}


}

export const logout = (req, res) => {

  res.clearCookie('coderPracticaIntegrado').json({ message: "ok Logout" })
    
}
