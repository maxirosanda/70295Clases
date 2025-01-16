import Business from "../daos/business.dao.js"

const businessService = new Business()

export const getBusiness = async (req, res) => {
    try {
        const result = await businessService.get()
        if(!result) res.status(500).send({status:"error",error:"Something went wrong, try again later"})
        res.send({ status: "success", result})
    } catch (error) {
        res.send({status:"error",error})
    }
}

export const getBusinessById = async (req, res) => {
    const {id} = req.params
    try {
        const result = await businessService.getById(id)
        if(!result) res.status(500).send({status:"error",error:"Something went wrong, try again later"})
        res.send({ status: "success", result})
    } catch (error) {
        res.send({status:"error",error})
    }
}

export const addProduct = async (req, res) => {
    const {id} = req.params
    const product = req.body
    try {
        const result = await businessService.getById(id)
        if(!result) res.status(500).send({status:"error",error:"Something went wrong, try again later"})
        result.products.push(product)
        await businessService.update(result._id,result)
        res.send({ status: "success", result})
    } catch (error) {
        
    }
}
