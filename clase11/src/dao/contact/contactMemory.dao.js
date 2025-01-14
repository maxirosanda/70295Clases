
export default class Contact {

    constructor(){
        this.data = [
            {
                fistName:"jose",
                lastName:"Perez",
                id:1
            }
        ]
    }

    get = async () => {
        return this.data
    }

    create = (newContact) => {

        this.data.push(newContact)
        return 'Contact created'
    }


}