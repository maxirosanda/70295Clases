import express from 'express'
import { config } from './config/config.js'
import toyRoutes from './routes/toy.routes.js'
import userRoutes from './routes/user.routes.js'
import MongoSingleton from './config/MongoSingleton.js'
import cors from 'cors'


const app = express()

app.use(express.json())
app.use(cors())
app.use('/public', express.static('../public'))

app.use('/api/toys',toyRoutes)
app.use('/api/users',userRoutes)
MongoSingleton.getInstance()



app.listen(config.port, () => {console.log('Server is running on port ' + config.port)})