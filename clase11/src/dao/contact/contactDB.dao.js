import contactModel from "../../models/contact.model.js"

export default class Contact {

    constructor(){

    }

    get = async () => {
        try {
            const result = contactModel.find({})
            return result
        } catch (error) {
            
        }
    }

    create = async (newContact) => {
        try {
            
            const result = await contactModel.create(newContact)
            return 'Contact created'

        } catch (error) {
            
        }
    } 


}