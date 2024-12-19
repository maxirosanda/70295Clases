import { Command } from "commander"
import fs from 'fs'

const program = new Command()

program
    .option("-d","variable para debub",false)
    .option("--mode <mode>","Modo de trabajo","development")
    .option("-p ,--port <port>","puerto",8080)
    .requiredOption("-u <user>","user")
    .option("-l, --letters [letters...]","letras")

program.parse()

//console.log(program.opts())
//console.log(program.args)

process.on('exit', code => {
    
    fs.writeFileSync('errors.log',`Proceso finalizado con código: ${code} - date: ${new Date().toISOString()}\n`, { flag: 'a' })
    console.log(`El proceso está terminando con código: ${code}`)

})

process.on('uncaughtException', err => {

    const logMessage = `Uncaught Exception: ${new Date().toISOString()} - ${err.stack}\n`
    fs.writeFileSync('errors.log', logMessage, { flag: 'a' })
    setTimeout(() => process.exit(1), 1000) 
})

console()
