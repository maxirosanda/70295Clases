import mongoose from 'mongoose'
import { config } from './config.js'

export default class DbConnection {
    static #instance

    constructor(){
        mongoose.connect(config.mongo_url)
    }

    static getIntance = () => {
        if(this.#instance){
            console.log('Already connected')
            return this.#instance
        }
        this.#instance = new DbConnection()
        console.log('Connected')
        return this.#instance
    }
}

