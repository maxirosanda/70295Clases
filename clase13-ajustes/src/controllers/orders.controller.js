import Orders from "../daos/orders.dao.js"
import Buyer from "../daos/buyer.dao.js"
import Business from "../daos/business.dao.js"

const buyerService = new Buyer()
const ordersService = new Orders()
const businessService = new Business()

export const getOrders = async (req, res) => {
    try {
        const result = await ordersService.get()
        res.sendSuccess(result)
    } catch (error) {
        res.sendServerError(error)
    }
};

export const getOrderById = async (req, res) => {
    const { id } = req.params
    try {
        const result = await ordersService.getById(id)
        res.sendSuccess(result)
    } catch (error) {
        res.sendServerError(error)
    }
}

export const getOrderByBuyer = async (req, res) => {
    const { idBuyer } = req.params
    try {
        const result = await ordersService.getByIdBuyer(idBuyer)
        res.sendSuccess(result)
    } catch (error) {
        res.sendServerError(error)
    }
}

export const getOrderByBusiness = async (req, res) => {
    const { idBusiness } = req.params
    try {
        const result = await ordersService.getByIdBusiness(idBusiness)
        res.sendSuccess(result)
    } catch (error) {
        res.sendServerError(error)
    }
}

export const createOrder = async (req, res) => {
    const { idBuyer, idBusiness, idsProducts, quantities } = req.body
    try {
        if (!idBuyer || !idBusiness || !idsProducts || !quantities) {
            return res.sendBadRequest("Required parameters are missing")
        }
        if (idsProducts.length !== quantities.length) {
            return res.sendBadRequest("Products and quantities arrays must have the same length")
        }

        const resultBuyer = await buyerService.getById(idBuyer)
        if (!resultBuyer) {
            return res.sendNotFound("Buyer not found")
        }

        const resultBusiness = await businessService.getById(idBusiness)
        if (!resultBusiness) {
            return res.sendNotFound("Business not found")
        }

        const actualOrders = resultBusiness.products.filter(product => idsProducts.includes(product.id))
        if (idsProducts.length !== actualOrders.length) {
            return res.sendBadRequest("Not all products are available")
        }

        for (let i = 0; i < actualOrders.length; i++) {
            const product = actualOrders[i]
            const quantity = quantities[i]
            if (product.stock < quantity) {
                return res.sendBadRequest(`Insufficient stock for product ${product.title}`)
            }
        }

        const total = actualOrders.reduce((acc, product, index) => acc + product.price * quantities[index], 0)
        const order = {
            business: resultBusiness,
            buyer: resultBuyer,
            status: "pending",
            products: actualOrders.map((product, index) => ({
                ...product,
                quantity: quantities[index]
            })),
            totalPrice: total
        }

        const orderResult = await ordersService.create(order)
        if (!orderResult) {
            return res.sendServerError("Order creation failed")
        }
        resultBuyer.orders.push(orderResult._id)
        await buyerService.update(idBuyer, resultBuyer)
        res.sendCreated(orderResult)
    } catch (error) {
        console.error("Error creating order:", error)
        res.sendServerError(error.message)
    }
}

export const resolveOrder = async (req, res) => {
    const { id } = req.params
    const { resolve } = req.body

    if (!id || !resolve) return res.sendBadRequest("Required parameters are missing")
    if (resolve !== "confirmed" && resolve !== "pending" && resolve !== "cancelled") {
        return res.sendBadRequest("Invalid 'resolve' parameter")
    }
    try {
        const order = await ordersService.getById(id)
        order.status = resolve
        await ordersService.resolve(order._id, order)
        res.sendSuccess("Order resolved")
    } catch (error) {
        res.sendServerError(error)
    }
}
