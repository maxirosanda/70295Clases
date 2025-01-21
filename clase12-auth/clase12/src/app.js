import express from 'express'
import { config } from './config/config.js'
import ordersRoutes from './routes/orders.routes.js'
import buyerRoutes from './routes/buyer.routes.js'
import businessRoutes from './routes/business.routes.js'
import DbConnection from './config/dbConnection.js'


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:"http://localhost:3000",
    methods:["GET","POST","PUT","DELETE"]
}))


app.use('/api/orders',ordersRoutes)
app.use('/api/business',businessRoutes)
app.use('/api/buyer',buyerRoutes)

DbConnection.getIntance()

app.listen(config.port,()=> console.log("server in port " + config.port))