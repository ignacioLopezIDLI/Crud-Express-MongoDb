import User from "../models/User"
import {SECRET} from "../config"
import jwt  from "jsonwebtoken"

export const signup = async (req,res) =>{
    const {username, email , password , roles} = req.body
    
    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password)
    }) 

    const savedUser =  await newUser.save()

    // Crear Token - Que dato guardo dentro (id) (Palabra secreta para generar token)  (objeto de configuracion )
    const token = jwt.sign({id: savedUser.id}, SECRET, {
        expiresIn: 86400 // 24Horas
    } )

    
    res.status(200).json({token})
}


export const signin = async (req,res) =>{
    res.json("singin")
}