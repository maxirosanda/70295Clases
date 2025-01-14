import ContactDTO from "../../dtos/contact.dto.js"

export default class ContactRepository {

    constructor(dao){
        this.dao = dao
    }

    getContacts = async () => {
        try {
            const result = await this.dao.get()
            const contacts = await result.map(item => {
                const newItem = new ContactDTO(item)
                return newItem
            })
            return contacts

        } catch (error) {
            
        }
    }

    createContact = async (data) => {
        
        try {
            const newContact = new ContactDTO(data)
            const result = await this.dao.create(newContact)
            return result

        } catch (error) {
            
        }
    }

}