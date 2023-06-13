// Importaciones
import express from 'express'
// Inicializo app
const app = express()

app.get("/",(req,res)=>{
    res.send("Hola Mundo Desde Node 2023")
})


app.listen(3000)
console.log("Server en el puerto ",3000)