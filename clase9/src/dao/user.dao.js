let users = [
    {
        name:"maxi",
        age:18
    }
]

export const userDao = {

    getUsers:()=> {
        return users
    },
    createUser: (user) => {
        users.push({...user, id:users.length + 1})
    },
    updateUser:(id,updateUser) => {
        const index = users.findIndex(user => user.id === id)
        if(index !== -1) {
            users[index] = {...users[index], ...updateUser}
        }
    },
    deleteUser:(id) => {
        users = users.filter(user => user.id !== id)
    }

}