import express from 'express'
import { config } from './config/config.js'
import toyRoutes from './routes/toy.routes.js'
import userRoutes from './routes/user.routes.js'
import {connected}  from './config/MongoSingleton.js'
import cors from 'cors'


const app = express()

app.use(express.json())
app.use(cors())
app.use('/public', express.static('../public'))

app.use('/api/toys',toyRoutes)
app.use('/api/users',userRoutes)
connected.getInstance()
setTimeout(()=>{
  console.log(connected.getInstance())  
},4000)





app.listen(config.port, () => {console.log('Server is running on port ' + config.port)})