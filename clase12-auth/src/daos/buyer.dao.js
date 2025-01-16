import buyerModel from "../models/buyer.model.js";

export default class Buyer {

    constructor(){

    }

    get = async () => {
        try {

            const buyers = await buyerModel.find()
            return buyers

        } catch (error) {

            console.log(error)
            return null
        }
    }

    getById = async (id) => {
        try {

            const buyer = await buyerModel.findOne({ _id: id })
            return buyer

        } catch (error) {

            console.log(error)
            return null
        }
    }

    getByEmail = async (email) => {
        try {

            const buyer = await buyerModel.findOne({email})
            return buyer

        } catch (error) {

            console.log(error)
            return null
        }
    }

   save = async (buyer) => {

        try {

            const result = await buyerModel.create(buyer)
            return result

        } catch (error) {
            console.log(error)
            return null

        }
    }

    update = async (id, buyer) => {
        try {

            const result = await buyerModel.updateOne({ _id: id }, { $set: buyer })
            return result

        } catch (error) {

            console.log(error)
            return null

        }
    }


}