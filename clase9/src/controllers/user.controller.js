import { userService } from "../services/user.service.js"

export const userController = {
    getUsers: async (req, res) => {
        const users= await userService.getUsers()
        res.send(users)
    },
    createUser: async (req, res) => {
        const user = req.body
        //validaciones
        const response = await userService.createUser(user)
        res.send({message: response})
    },
    updateUser: async (req, res) => {
        const id = parseInt(req.params.id)
        const updateUser = req.body
        //validaciones
        const response = await userService.updateUser(id,updateUser)
        res.send({message: response})
    },
    deleteUser: async (req, res) => {
        const id = parseInt(req.params.id)
        //validaciones
        const response = await userService.deleteUser(parseInt(id))
        res.send({message: response})
    }
}