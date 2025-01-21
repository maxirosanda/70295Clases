import express from 'express'
import { config } from './config/config.js'
import ordersRoutes from './routes/orders.routes.js'
import buyerRoutes from './routes/buyer.routes.js'
import businessRoutes from './routes/business.routes.js'
import DbConnection from './config/dbConnection.js'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import initializePassport from './config/auth.config.js'
import authRoutes from './routes/auth.routes.js'
import cors from 'cors'
import { generateCustomResponses } from './utils/generateCustomResponses.js'


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:3000",
    methods:["GET","POST","PUT","DELETE"]
}))

app.use(passport.initialize())
initializePassport()
app.use(generateCustomResponses)

app.use('/api/orders',ordersRoutes)
app.use('/api/business',businessRoutes)
app.use('/api/buyer',buyerRoutes)
app.use('/api/auth',authRoutes)

DbConnection.getIntance()
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
}); 

app.listen(config.port,()=> console.log("server in port " + config.port))