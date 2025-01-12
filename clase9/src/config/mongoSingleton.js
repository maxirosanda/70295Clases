import mongoose from 'mongoose';
import { config } from './config.js';
/*
export default class MongoSingleton {
    static #instance;

    constructor() {
        mongoose.connect(config.mongoUrl);
    }

    static getInstance() {
        if (this.#instance) {
            console.log("Already connected");
            return this.#instance;
        }
        this.#instance = new MongoSingleton();
        console.log("Connected");
        return this.#instance;
    }
}
*/

const MongoSingleton =  () => {

    let instance = null


    const getInstance = async () => {
        if (instance) {
            console.log("Already connected")
            return instance
        }
        console.log("Connected")
        instance = {}
        instance = await mongoose.connect(config.mongoUrl)
        
        return 
    }

    return {
        getInstance
    }
}

export const connected = MongoSingleton()

