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



// Ruta Para Eliminar Usuario 
export const deleteUser = async (req,res)=>{
    try {
        const {id} = req.params

        const user = await User.findById(id)

        if (!user) {
            // Usario no Encontrado 
            return res.status(404).json({ message: "Usuario no Encontrado" });
          }

          // Eliminar Usuario
           await User.findByIdAndDelete(id)
        
           res.redirect("/user")


    } catch (error) {
        console.log(error)
    }
}