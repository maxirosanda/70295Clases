import businessModel from "../models/business.model.js"

export default class Business {

    constructor(){

    }

    get = async () => {

        try {

            const result = await businessModel.find()
            return result

        } catch (error) {

            console.log(error)
            return { error: "Failed to fetch businesses" }

        }
    }

    getById = async (id) => {

        try {

            const result = await businessModel.findOne({ _id: id })
            return result

        } catch (error) {

            console.log(error)
            return { error: "Failed to fetch business by ID" }

        }
    }

    getByEmail = async (email) => {

        try {

            const result = await businessModel.findOne({ email })
            return result

        } catch (error) {

            console.log(error)
            return { error: "Failed to fetch business by email" }

        }
    }

    save = async (business) => {
        try {

            const result = await businessModel.create(business)
            return result

        } catch (error) {

            console.log(error)
            return { error: "Failed to save business" }

        }
    }

    update = async (id, business) => {

        try {

            const result = await businessModel.updateOne({ _id: id }, { $set: business })
            return result

        } catch (error) {

            console.log(error)
            return { error: "Failed to update business" }
            
        }
    }


}