import jwt from 'jsonwebtoken'

export const generateToken = (user) => jwt.sign({user},process.env.SECRET_JWT,{expiresIn:'24H'})