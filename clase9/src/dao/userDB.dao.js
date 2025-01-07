import userModel from "../models/user.model.js"

export const userDao = {

    getUsers:async ()=> {
        const users = await userModel.find({})
        return users
    },
    createUser: async  (user) => {
        await userModel.create(user)
    },
    updateUser:async (id,updateUser) => {
        await userModel.updateOne({_id:id},updateUser)
    },
    deleteUser:async (id) => {
        await userModel.deleteOne({_id:id})
    }

}