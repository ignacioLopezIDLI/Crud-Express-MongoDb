import  Jwt  from "jsonwebtoken"
import config, { SECRET } from "../config"
import User from "../models/User"
import Role from "../models/Role"


export const  verifyToken = async (req, res, next) => {
    try {
        const token  = req.cookies.jwt  // Extraer el token de la cookie
    
        if(!token) return res.status(403).json ({message :" Sin Token asignado "})

        const decoded = Jwt.verify(token,SECRET)
        req.userId = decoded.id

        const user = await User.findById(req.userId,{password:0})
        if(!user) return res.status(404).json({message:"Usuario no encontrado"})

        next()
    } catch (error) {
        return res.status(401).json({message: "No autorizado"})
    }

}

export const isAdmin = async (req, res, next) => {
    const user = await User.findById(req.userId) // Busca usuario x ID
    const roles = await Role.find({_id:{$in:user.roles}}) // Busca los roles asociados al ID

    for (let i = 0; i < roles.length; i++) {
        if(roles[i].name === "admin"){
            next()
            return
        }
        
    }
    return res.status(403).json({message:"Requiere Ser Administrador"})
    
}



 export const cokieParser1 = (req,res,next) =>{
    try {
        const token = req.cookies.jwt
        const validPayload = Jwt.verify(token, process.env.SECRET)
        console.log(123);
        console.log(validPayload)
        next()
    } catch (error) {
        res.status(401).json({ok:false,message:"Invalid TOKEN"})
    }
 }