import passport from "passport"
import local from 'passport-local'
import jwt, { ExtractJwt } from 'passport-jwt'
import GithubStrategy from 'passport-github2'
import userModel from "../models/user.model.js"
import { createHash, isValidPassword } from "../utils/hashingUtils.js"

const LocalStrategy = local.Strategy
const JWTStrategy = jwt.Strategy


const cookieExtractor = (req) => {
    return req && req.cookies ? req.cookies["coderPracticaIntegrado"] : null
}

const initializePassport= () => {


    passport.use('jwt',new JWTStrategy(
        {
            jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
            secretOrKey:process.env.SECRET_JWT
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
            const { firstName, lastName, age } = req.body
            try {

                const user = await userModel.findOne({email:username})
                if(user) return done(null,false,{message:"User already exists"})

                const newUser = {
                    email:username,
                    password:createHash(password),
                    firstName,
                    lastName,
                    age
                }

                const result = await userModel.create(newUser)
                return done(null,result)
                
                
            } catch (error) {
                return done(error)
            }

        }
    ))

    passport.use('login',new LocalStrategy(
        {usernameField:'email'},
        async (username,password,done) => {
            try {

                const user = await userModel.findOne({email:username})
                if(!user) return done(null,false)
                if(!isValidPassword(user,password)) return done(null,false)
                return done(null,user)

            } catch (error) {

                return done(error)

            }
        }
    ))


    passport.use('github',new GithubStrategy(
        {
            clientID:'Iv23liN87jnpSZqVdv09',
            clientSecret:'f3895648f915b27e1b271e815eb9029f96ddbb0e',
            callbackURL:'http://localhost:8080/api/users/githubcallback'
        },async (_,__,profile,done) => {

            try {

                const user = await userModel.findOne({idGithub:profile._json.id})
                if(user) return done(null,user)

                const newUser = {
                    firstName:profile._json.name,
                    idGithub:profile._json.id
                    }

                const result = await userModel.create(newUser)
                return done(null,result)

            } catch (error) {
                done(error)
            }
        }
    ))
}

export default initializePassport