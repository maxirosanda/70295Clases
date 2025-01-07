
let toys = [
    {
        id: 1,
        name: 'Toy1',
        description: 'This is toy 1'
    }
]

export const toyDao = {

    getToys:()=> {
        return toys
    },
    createToy: (toy) => {
        toys.push({...toy, id:toys.length + 1})
    },
    updateToy:(id,updateToy) => {
        const index = toys.findIndex(toy => toy.id === id)
        if(index !== -1) {
            toys[index] = {...toys[index], ...updateToy}
        }
    },
    deleteToy:(id) => {
        toys = toys.filter(toy => toy.id !== id)
    }

}