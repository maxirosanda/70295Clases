import { toyDao } from "../dao/toy.dao.js"

export const toyService = {
    getToys: () => {
        //logica de negocio
        const toys = toyDao.getToys()
        return toys
    },
    createToy: (toy) => {
        //logica de negocio
        toyDao.createToy(toy)
        return 'Toy created!'
    },
    updateToy: (id,updateToy) => {
        //logica de negocio
        toyDao.updateToy(id,updateToy)
        return 'Toy updated!'
    },
    deleteToy: (id) => {
        toyDao.deleteToy(id)
        return 'Toy deleted!'
    }
}