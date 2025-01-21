import ordersModel from "../models/orders.model.js";

export default class Orders {
    constructor() {}

    get = async () => {
        try {
            const result = await ordersModel.find();
            return result
        } catch (error) {
            console.log(error)
            return { error: "Failed to fetch orders" }
        }
    }

    getById = async (id) => {
        try {
            const result = await ordersModel.findOne({ _id: id })
            return result
        } catch (error) {
            console.log(error)
            return { error: "Failed to fetch order by ID" }
        }
    }

    getByIdBuyer = async (idBuyer) => {
        try {
            console.log(idBuyer)
            const result = await ordersModel.findOne({ buyer: idBuyer })
            return result
        } catch (error) {
            console.log(error)
            return { error: "Failed to fetch order by buyer ID" }
        }
    }

    getByIdBusiness = async (idBusiness) => {
        try {
            const result = await ordersModel.findOne({ business: idBusiness })
            return result
        } catch (error) {
            console.log(error)
            return { error: "Failed to fetch order by business ID" }
        }
    }

    create = async (order) => {
        try {
            const result = await ordersModel.create(order)
            return result
        } catch (error) {
            console.log(error)
            return { error: "Failed to create order" }
        }
    }

    resolve = async (id, order) => {
        try {
            const result = await ordersModel.updateOne({ _id: id }, { $set: order })
            return result
        } catch (error) {
            console.log(error)
            return { error: "Failed to resolve order" }
        }
    }
}