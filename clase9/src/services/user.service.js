import { userDao } from "../dao/userDB.dao.js"

export const userService = {
    getUsers: async () => {
        //logica de negocio
        const users = await userDao.getUsers()
        return users
    },
    createUser: async (user) => {
        //logica de negocio
        await userDao.createUser(user)
        return 'User created!'
    },
    updateUser: async (id,updateUser) => {
        //logica de negocio
        await userDao.updateUser(id,updateUser)
        return 'User updated!'
    },
    deleteUser: async (id) => {
        await userDao.deleteUser(id)
        return 'User deleted!'
    }
}