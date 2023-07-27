import User from "../models/User"
import {SECRET} from "../config"
import jwt  from "jsonwebtoken"
import Role from "../models/Role"

export const signup = async (req,res) =>{
    const {username, email , password , roles} = req.body
    
    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password)
    }) 

    
    // Asignar Roles roles existe - consulta BD $in - name == con roles
    if  (roles){
       const foundRoles =  await Role.find({name: {$in: roles }})
       newUser.roles = foundRoles.map(role => role._id)  // busco los id y los asigno al new user
    } else {
        const role = await Role.findOne({name:"user"}) // consulto a BD el rol user
        newUser.roles = [role._id]                  // Asigno rol
    }

    const savedUser =  await newUser.save()
    console.log(savedUser)

    // Crear Token - Que dato guardo dentro (id) (Palabra secreta para generar token)  (objeto de configuracion )
    const token = jwt.sign({id: savedUser.id}, SECRET, {
        expiresIn: 86400 // 24Horas
    } )

    
    res.status(200).json({token})
}


export const signin = async (req,res) =>{

    const userfound =  await User.findOne({email:req.body.email}).populate("roles") // Consulto Email BD
    
    if(!userfound) return res.status(400).json({message:"Usuario No Encontrado"}) // Si user no existe error 400


    const matchPassword = await User.comparePassword(req.body.password, userfound.password) // Comparo password body y BD

    if (!matchPassword) return res.status(401).json({token:null, message:"Contraseña Invalida"}) 
 
    const token =  jwt.sign({id:userfound._id}, SECRET,{
        expiresIn: 86400
    })

    res.json({token})

}