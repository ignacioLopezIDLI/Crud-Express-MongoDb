import  Jwt  from "jsonwebtoken"
import config, { SECRET } from "../config"
import User from "../models/User"


export const  verifyToken = async (req, res, next) => {
    try {
        const token  = req.headers["x-access-token"]
    
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