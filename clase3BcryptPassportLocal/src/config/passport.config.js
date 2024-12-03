import passport from "passport"
import local from "passport-local"
import userModel from "../models/userModel.js"
import { createHash,isValidPassword } from "../utils.js"

const LocalStrategy = local.Strategy

const initializePassport = () => {

    passport.use('register',new LocalStrategy(
        {passReqToCallback:true,usernameField:"email"},
        async (req,username,password,done)=>{

            const {firstName, lastName, age } = req.body

            try {
        
                const existUser = await userModel.findOne({email:username})
                if(existUser) return done(null,false)
        
                const newUser = {
                    firstName,
                    lastName,
                    age,
                    email:username,
                    password:createHash(password)
                }
                const user = await userModel.create(newUser)
                done(null,user)

            } catch (error) {
                done(error)
            }
    }))

    passport.use('login',new LocalStrategy(
        {usernameField:'email'},
        async (username,password,done)=>{

            try {
                const user = await userModel.findOne({email:username})
                if(!user) return done(null,false)
                if(!isValidPassword(user,password)){
                    done(null,false)
                }
        
                return done(null,user)
                
            } catch (error) {
                done(error)
            }

        }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
      })
    
      passport.deserializeUser(async (id, done) => {
        let user = await userModel.findById(id)
        done(null, user)
      })
}

export default initializePassport