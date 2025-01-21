import Business from "../daos/business.dao.js"

const businessService = new Business()

export const getBusiness = async (req, res) => {
    try {
        const result = await businessService.get()
        if (!result) return res.sendServerError("Something went wrong, try again later")
        res.sendSuccess(result)
    } catch (error) {
        res.sendServerError(error)
    }
}

export const getBusinessById = async (req, res) => {
    const { id } = req.params
    try {
        const result = await businessService.getById(id)
        if (!result) return res.sendServerError("Something went wrong, try again later")
        res.sendSuccess(result)
    } catch (error) {
        res.sendServerError(error)
    }
}

export const addProduct = async (req, res) => {
    const { id } = req.params
    const product = req.body
    try {
        const result = await businessService.getById(id)
        if (!result) return res.sendServerError("Something went wrong, try again later")
        result.products.push(product)
        await businessService.update(result._id, result)
        res.sendSuccess(result)
    } catch (error) {
        res.sendServerError(error)
    }
}
