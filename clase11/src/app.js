import express from 'express'
import { config } from './config/config.js'
import DbConnection from './config/dbConnection.js'
import contactRoutes from './routes/contact.routes.js'

const app = express()

app.use(express.json())
app.use('/api/contact',contactRoutes)
DbConnection.getIntance()
app.listen(config.port,()=> console.log("server in port " + config.port))

