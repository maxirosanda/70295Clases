import { toyService } from "../services/toy.service.js"

export const toyController = {
    getToys: (req, res) => {
        const toys = toyService.getToys()
        res.send(toys)
    },
    createToy: (req, res) => {
        const toy = req.body
        //validaciones
        const response = toyService.createToy(toy)
        res.send({message: response})
    },
    updateToy: (req, res) => {
        const id = parseInt(req.params.id)
        const updateToy = req.body
        //validaciones
        const response = toyService.updateToy(id,updateToy)
        res.send({message: response})
    },
    deleteToy: (req, res) => {
        const id = parseInt(req.params.id)
        //validaciones
        const response = toyService.deleteToy(parseInt(id))
        res.send({message: response})
    }
}