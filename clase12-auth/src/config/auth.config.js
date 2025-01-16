import passport from "passport"
import local from 'passport-local'
import Buyer from "../daos/buyer.dao.js"
import Business from "../daos/business.dao.js"
import { createHash, isValidPassword } from "../utils/hashingUtils.js"
import jwt, { ExtractJwt } from 'passport-jwt'
import { config } from "./config.js"



const LocalStrategy = local.Strategy
const JWTStrategy = jwt.Strategy

const buyerService = new Buyer()
const businessService = new Business()

const cookieExtractor = (req) => {
    return req && req.cookies ? req.cookies["coderPracticaIntegrado"] : null
}

const initializePassport = () => {


    passport.use('jwt',new JWTStrategy(
        {
            jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
            secretOrKey:config.secret_jwt
        },
        async (jwt_payload,done) =>{
            try {
               return done(null,jwt_payload.user) 
            } catch (error) {
                return done(error)
            }
        }
    ))

    passport.use('register',new LocalStrategy(
        {
            passReqToCallback:true,
            usernameField:"email"
        },
        async (req,username,password,done) => {

            const { firstName, lastName, role } = req.body

            if (!firstName || !lastName || !role || !username || !password) {
                return done(null,false,"Required parameters are missing" )
            }

            if(role !== "buyer" && role !== "business"){
                done(null,false,"Role required" )
            }

            try {

                const user = role === "buyer" ?  
                    await buyerService.getByEmail(username) 
                    :
                    await businessService.getByEmail(username)
                if(user) return done(null,false,{message:"User already exists"})

                const newUser = {
                    email:username,
                    password:createHash(password),
                    firstName,
                    lastName,
                    role
                }

                const result =  role === "buyer" ?  
                    await buyerService.save(newUser)
                    :
                    await businessService.save(newUser)
                return done(null,result)
                
                
            } catch (error) {
                return done(error)
            }

        }
    ))

    passport.use('login',new LocalStrategy(
        {
            usernameField:'email',
            passReqToCallback:true,

        },
        async (req,username,password,done) => {

            const {role } = req.body

            if (!role || !username || !username) {
                return done(null,false,"Required parameters are missing" )
            }

            if(role !== "buyer" && role !== "business"){
                done(null,false,"Role required" )
            }

            try {

                const user = role === "buyer" ?  
                await buyerService.getByEmail(username) 
                :
                await businessService.getByEmail(username)
                if(!user) return done(null,false)
                if(!isValidPassword(user,password)) return done(null,false)
                return done(null,user)

            } catch (error) {

                return done(error)

            }
        }
    ))

    
}

export default initializePassport