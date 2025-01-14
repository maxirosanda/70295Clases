import { contactService } from "../service/contact/index.js"

export default class ContactController {

    constructor(){}

    getContact = async (req,res) => {
        try {

            const result = await contactService.getContacts()
            res.status(200).send(result)

        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    createContact = async (req,res) => {
        try {

            const {firstName, lastName} = req.body
            const result = await contactService.createContact({firstName,lastName})
            res.send({message:result})

        } catch (error) {
            
        }
    }
}