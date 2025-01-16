import Orders from "../daos/orders.dao.js"
import Buyer from "../daos/buyer.dao.js"
import Business from "../daos/business.dao.js"

const buyerService = new Buyer()
const ordersService = new Orders()
const businessService = new Business()

export const getOrders = async (req, res) => {
    try {

        const result = await ordersService.get()
        res.send({ status: "success", result})

    } catch (error) {

        res.send({status:"error",error})
        
    }
};

export const getOrderById = async (req, res) => {
    const { id } = req.params

    try {

        const result = await ordersService.getById(id)
        res.send({ status: "success", result})

    } catch (error) {

        res.send({status:"error",error})
        
    }
}


export const createOrder = async (req, res) => {

    const { idBuyer, idBusiness, idsProducts,quantities } = req.body
    try {

        if (!idBuyer || !idBusiness || !idsProducts || !quantities) {
            return res.status(400).send({ message: "Required parameters are missing" })
        }
        if (idsProducts.length !== quantities.length) {
            return res.status(400).send({ message: "Products and quantities arrays must have the same length" })
        }

        const resultBuyer = await buyerService.getById(idBuyer)
        if (!resultBuyer) {
            return res.status(404).send({ message: "Buyer not found" })
        }

        const resultBusiness = await businessService.getById(idBusiness)
        if (!resultBusiness) {
            return res.status(404).send({ message: "Business not found" })
        }

        const actualOrders = resultBusiness.products.filter(product => idsProducts.includes(product.id))

        if (idsProducts.length !== actualOrders.length) {
            return res.status(400).send({ message: "no todos los productos estan disponibles" })
        }

        for (let i = 0; i < actualOrders.length; i++) {
            const product = actualOrders[i]
            const quantity = quantities[i]

            if (product.stock < quantity) {
                return res.status(400).send({ message: `Insufficient stock for product ${product.name}` })
            }
        }

        const total = actualOrders.reduce((acc,product,index) => acc + product.price * quantities[index] , 0)
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
            return res.status(404).send({ message: "Order fail" })
        }
        resultBuyer.orders.push(orderResult._id)
        await buyerService.update(idBuyer, resultBuyer)
        res.status(201).send({ status: "success", orderResult })

    } catch (error) {
        console.error("Error creating order:", error)
        res.status(500).send({ status: "error", message: "An error occurred while creating the order", error: error.message })
    }
}


export const resolveOrder = async (req, res) => {
    const { id } = req.params
    const { resolve } = req.body

    if(!id || !resolve)  return res.status(400).send({ message: "Required parameters are missing" })
    if(resolve !== "confirmed" && resolve !== "pending" && resolve !== "cancelled"){
        return res.status(400).send({ message: "Parámetro 'resolve' inválido" })
    }
    try {

        const order = await ordersService.getById(id)
        order.status = resolve
        await ordersService.resolve(order._id, order)
        res.send({status: "success", result: "Order resolved"})

    } catch (error) {
        res.send({status:"error",error})
    }
}
