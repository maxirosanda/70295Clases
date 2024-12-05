import passport from "passport"
import local from "passport-local"
import GitHubStrategy from 'passport-github2'
import userModel from "../models/userModel.js"
import { createHash, isValidPassword } from "../utils.js"


const LocalStrategy = local.Strategy

const initializePassport = () => {

    passport.use('github',new GitHubStrategy({
      clientID:'Iv23liN87jnpSZqVdv09',
      clientSecret:'f3895648f915b27e1b271e815eb9029f96ddbb0e',
      callbackURL:'http://localhost:8080/api/session/githubcallback'
    },async (_,__,profile,done) => {
        try {
          let user = await userModel.findOne({id_github:profile._json.id})
          if(user) done(null,user)
          const newUser = {
              firstName:profile._json.name,
              lastName:"",
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

    passport.use('register', new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: 'email'
      },
      async (req, username, password, done) => {
  
        const { firstName, lastName, age } = req.body

        try {
          let user = await userModel.findOne({ email: username })
          if (user) {
            console.log("User already exists")
            return done(null, false)
          }
  
          const newUser = {
            firstName,
            lastName,
            email:username,
            age,
            password: createHash(password)
          }
  
          let result = await userModel.create(newUser)
       
          return done(null, result)
  
        } catch (error) {
          return done("Error al obtener el usuario: " + error) 
        }
      }
    ))
  
    passport.use('login',new LocalStrategy(
      { usernameField: 'email' }, 
      async (username, password, done) => {
          try {

              const user = await userModel.findOne({ email: username })

              if (!user) {
                  console.log("User doesn't exist")
                  return done(null, false)
              }

              if (!isValidPassword(user, password)) return done(null, false)
                
              return done(null, user)

          } catch (error) {

              return done(error)

          }
      })
   )
   
    passport.serializeUser((user, done) => {
      done(null, user._id)
    })
  
    passport.deserializeUser(async (id, done) => {
      let user = await userModel.findById(id)
      done(null, user)
    })
  
  }
  
  export default initializePassport