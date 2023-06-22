import mongoose from "mongoose" 

(async ()=>{
    try {
        const db = await mongoose.connect("mongodb://localhost:27017/crud-mongo")
        console.log("Base Datos Conectada",db.connection.name)
    } catch (error) {
        console.log(error)
    }
})()

