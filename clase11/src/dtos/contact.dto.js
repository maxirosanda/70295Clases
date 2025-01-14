

export default class ContactDTO {
    constructor(contact){
        this.firstName = contact.firstName
        this.lastName = contact.lastName
        this.fullName = contact.firstName + " " + contact.lastName
        this.active = true
    }
}