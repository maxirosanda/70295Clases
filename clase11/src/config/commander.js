import { program } from "commander"

program
    .option("--persistence <persistence>","","MONGO")
program.parse()

export const options = program.opts()
