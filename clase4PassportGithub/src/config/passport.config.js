import passport from "passport"
import userModel from "../models/user.model.js"
import GitHubStrategy from 'passport-github2'

const initializePassport = () => {


    passport.use('github',new GitHubStrategy({
        clientID:'Iv23liN87jnpSZqVdv09',
        clientSecret:'f3895648f915b27e1b271e815eb9029f96ddbb0e',
        callbackURL:'http://localhost:8080/api/session/githubcallback'
    },async (_,__,profile,done)=>{
        try {

            let user = await userModel.findOne({id_github:profile._json.id})
            if(user) done(null,user)
            const newUser = {
                first_name:profile._json.name,
                last_name:"",
                age:0,
                email:"",
                password:"",
                role:'user',
                id_github:profile._json.id
            }
            const result = await userModel.create(newUser)
            done(null,result)

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