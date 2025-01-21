import Buyer from "../daos/buyer.dao.js"

const buyerService = new Buyer()

export const getBuyers = async (req, res) => {
    try {
        const result = await buyerService.get()
        res.sendSuccess(result)
    } catch (error) {
        res.sendServerError(error)
    }
}

export const getBuyerById = async (req, res) => {
    const { id } = req.params
    try {
        const result = await buyerService.getById(id)
        res.sendSuccess(result)
    } catch (error) {
        res.sendServerError(error)
    }
}

export const getBuyerByEmail = async (req, res) => {
    const { email } = req.params
    try {
        const result = await buyerService.getByEmail(email)
        res.sendSuccess(result)
    } catch (error) {
        res.sendServerError(error)
    }
}

export const createBuyer = async (req, res) => {
    const buyerData = req.body
    try {
        const result = await buyerService.save(buyerData)
        res.sendCreated(result)
    } catch (error) {
        res.sendServerError(error)
    }
}

export const updateBuyer = async (req, res) => {
    const { id } = req.params
    const buyerData = req.body
    try {
        const result = await buyerService.update(id, buyerData)
        res.sendSuccess(result)
    } catch (error) {
        res.sendServerError(error)
    }
}
