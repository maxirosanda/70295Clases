import Buyer from "../daos/buyer.dao.js"

const buyerService = new Buyer()

export const getBuyers = async (req, res) => {

    try {

        const result = await buyerService.get()
        res.send({ status: "success", result})

    } catch (error) {

        res.send({status:"error",error})
        
    }

 
}

export const getBuyerById = async (req, res) => {
    const {id} = req.params
    try {

        const result = await buyerService.getById(id)
        res.send({ status: "success", result})

    } catch (error) {

        res.send({status:"error",error})

    }

}
