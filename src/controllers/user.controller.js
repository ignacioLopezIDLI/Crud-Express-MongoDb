import User from "../models/User"



// Ruta Crear User 
export const createU = (req,res) =>{
    res.json("Creando User")
}


// Ruta  Renderizar User
export const renderUser = async (req,res)=>{
    const user = await User.find().populate("roles").lean() // .lean() Transforma objetos de MongoDB a objetos js

    res.render("user",{user : user}) // Da info de BD para renderizar 
}