import { options } from "../../config/commander.js";

export  let Contact
switch(options.persistence){
    case "MONGO":
        const {default:contactMongo} = await import('./contactDB.dao.js')
        Contact = contactMongo
        break
    case "MEMORY":
        const {default:contactMemory} = await import('./contactMemory.dao.js')
        Contact = contactMemory
        break
}