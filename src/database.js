import mongoose from "mongoose" 
import { MONGODB_URI } from "./config"

(async ()=>{
    try {
        const db = await mongoose.connect(MONGODB_URI)
        console.log("Base Datos Conectada",db.connection.name)
    } catch (error) {
        console.log(error)
    }
})()

