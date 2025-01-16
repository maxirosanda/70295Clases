import ordersModel from "../models/orders.model.js"

export default class Orders {

    constructor(){

    }

    get = async () => {
        try {

            const result = await ordersModel.find();
            return result

        } catch (error) {

            console.log(error)
            return null

        }
    }

    getById = async (id) => {

        try {

            const result = await ordersModel.findOne({ _id: id })
            return result

        } catch (error) {

            console.log(error)
            return null

        }
    }

    create = async (order) => {
        try {

            const result = await ordersModel.create(order)
            return result

        } catch (error) {
            console.log(error)
            return null
        }
    }

    resolve = async (id, order) => {

        try {
            const result = await ordersModel.updateOne({ _id: id }, { $set: order })
            return result

        } catch (error) {

            console.log(error)
            return null
        }
    }


}