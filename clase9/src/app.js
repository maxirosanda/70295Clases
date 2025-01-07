import express from 'express'
import { config } from './config/config.js'
import toyRoutes from './routes/toy.routes.js'
import userRoutes from './routes/user.routes.js'
import mongoose from 'mongoose'

const app = express()

app.use(express.json())

app.use('/api/toys',toyRoutes)
app.use('/api/users',userRoutes)
mongoose.connect(config.mongoUrl)

app.listen(config.port, () => {console.log('Server is running on port ' + config.port)})