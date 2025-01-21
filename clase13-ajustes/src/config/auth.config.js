import passport from "passport"
import local from 'passport-local'
import Buyer from "../daos/buyer.dao.js"
import Business from "../daos/business.dao.js"
import Admin from "../daos/admin.dao.js"
import { createHash, isValidPassword } from "../utils/hashingUtils.js"
import jwt, { ExtractJwt } from 'passport-jwt'
import { config } from "./config.js"
import GithubStrategy from 'passport-github2'



const LocalStrategy = local.Strategy
const JWTStrategy = jwt.Strategy

const buyerService = new Buyer()
const businessService = new Business()
const adminService = new Admin()

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
                return done(null,false,{message:error.message})
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
                return done(null,false,{message:"Required parameters are missing"})
            }

            if(role !== "buyer" && role !== "business"&& role !== "admin"){
                return done(null,false,{message:"Invalid role"})
            }

            try {

                const user = 
                    role === "buyer" ?  
                        await buyerService.getByEmail(username) 
                    : role === "business" ?
                        await businessService.getByEmail(username)
                    :
                        await adminService.getByEmail(username)
                if(user) return done(null,false,{message:"User already exists"})

                const newUser = {
                    email:username,
                    password:createHash(password),
                    firstName,
                    lastName,
                    role
                }

                const result =  
                    role === "buyer" ?  
                        await buyerService.save(newUser) 
                    : role === "business" ?
                        await businessService.save(newUser)
                    :
                        await adminService.save(newUser)
                return done(null,result)
                
                
            } catch (error) {
                return done(null, false, { message: error.message })
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

            if(role !== "buyer" && role !== "business" && role !== "admin"){
                done(null,false,"Invalid role" )
            }

            try {

                const user = 
                    role === "buyer" ?  
                        await buyerService.getByEmail(username) 
                    : role === "business" ?
                        await businessService.getByEmail(username)
                    :
                        await adminService.getByEmail(username)
                
                        if (!user) return done(null, false, { message: "User not found" });

                if(!isValidPassword(user,password)) return done(null,false,{message:"ivalid password"})
                return done(null,user)

            } catch (error) {

                return done(null, false, { message: error.message })
            }
        }
    ))


    passport.use('github',new GithubStrategy(
        {
            clientID:'Iv23liN87jnpSZqVdv09',
            clientSecret:'f3895648f915b27e1b271e815eb9029f96ddbb0e',
            callbackURL:'http://localhost:8080/api/auth/githubcallback',
            passReqToCallback: true 
        },async (req,_,__,profile,done) => {

            try {

                const user =  await buyerService.getByIdGithub(profile._json.id)
                if(user) return done(null,user)

                const newUser = {
                    firstName:profile._json.name,
                    idGithub:profile._json.id
                    }

                const result = await buyerService.save(newUser) 
                return done(null,result)

            } catch (error) {
                return done(null, false, { message: error.message })
            }
        }
    ))

    
}

export default initializePassport