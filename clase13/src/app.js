import express from 'express'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import __dirname from './config/dirname.js'
import twilio from 'twilio'

dotenv.config()
const app = express()
app.use(express.json())
app.use('/public', express.static('public'))

const clientTwilio = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})


app.get('/email',async (req, res) => {

  try {
    const result = await transport.sendMail({
        from: `Profe <${process.env.EMAIL}>`,
        to: 'maxi_rosanda@hotmail.com',
        subject: 'Test Email',
        html:`  <h1>Test Email</h1>
                <p>Este es un email de prueba</p>
                <img src="cid:perrito1">
        `,
        attachments:[{
            filename: 'perrito1.jpg',
            path: __dirname + '/public/img/perrito1.jpg',
            cid: 'perrito1'

        }]
      })
      res.send(result)
  } catch (error) {
        res.json(error)
  }
})  

app.get('/sms', async (req, res) => {
    try {
        const nameUser = 'Maxi'
        const product = 'Iphone 12'
        const result = await clientTwilio.messages.create({
            from: `${process.env.TWILIO_TEL}`,
            to:'+541168179706' ,
            body: `Hola ${nameUser}! Gracias por tu compra de ${product}!`
        })
        res.send(result)
    } catch (error) {
        res.json(error)
    }
})


app.listen(8080, () => {
  console.log('Server is running on http://localhost:8080')
})