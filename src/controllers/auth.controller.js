import User from "../models/User"
import {SECRET} from "../config"
import jwt  from "jsonwebtoken"
import Role from "../models/Role"
import { renderTask } from "./task.controller"
import userCtrl, { renderUser } from "./user.controller"
import cookieParser from "cookie-parser"

// Registrar user
export const signup = async (req,res) =>{
    const {username, email , password , userRole, adminRole} = req.body
    
    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password)
    }) 

    // Asignar Roles roles existe - consulta BD $in - name == con roles
    if (userRole && adminRole) {
        // Ambos checkboxes están marcados
        // Asigna ambos roles
        const userRole = await Role.findOne({ name: "user" });
        const adminRole = await Role.findOne({ name: "admin" });
        newUser.roles = [userRole._id, adminRole._id];
    } else if (userRole) {
        // Solo el checkbox de Usuario está marcado
        const userRole = await Role.findOne({ name: "user" });
        newUser.roles = [userRole._id];
    } else if (adminRole) {
        // Solo el checkbox de Administrador está marcado
        const adminRole = await Role.findOne({ name: "admin" });
        newUser.roles = [adminRole._id];
    } else {
        // Ningún checkbox está marcado, asigna el rol de usuario por defecto
        const defaultRole = await Role.findOne({ name: "user" });
        newUser.roles = [defaultRole._id];
    }
    const savedUser =  await newUser.save()
    console.log(savedUser)

    // Crear Token - Que dato guardo dentro (id) (Palabra secreta para generar token)  (objeto de configuracion )
    const token = jwt.sign({id: savedUser.id}, SECRET, {
        expiresIn: 86400 // 24Horas
    } )


    renderUser(req,res)
    
}

// Login user
export const signin = async (req,res) =>{

    const userfound =  await User.findOne({email:req.body.email}).populate("roles") // Consulto Email BD
    
    if(!userfound) return res.status(400).json({message:"Usuario No Encontrado"}) // Si user no existe error 400


    const matchPassword = await User.comparePassword(req.body.password, userfound.password) // Comparo password body y BD

    if (!matchPassword) return res.status(401).json({token:null, message:"Contraseña Invalida"}) 
 
    const token =  jwt.sign({id:userfound._id}, SECRET,{
        expiresIn: 86400    
    })

    
    renderTask(req,res)
    

}


// Ruta para renderizar Login
export const renderLogin1 = async(req,res)=>{
    
    res.render("userLogin1") // Da info de BD para renderizar 
}


    // Ruta Login nueva 

    export const login = async function (req,res,next){
        // Obtiene el email y la contraseña del cuerpo de la solicitud (request body)
        const { email, password } = req.body
        
        // Verifica si el email o la contraseña no están presentes en la solicitud
        if (!email || !password){
            return res.status(400).json({
                message: "Email o contraseña no presentes"
            })
        }

        try {
            // Busca un usuario en la base de datos por su email
            const userfound =  await User.findOne({email:req.body.email}).populate("roles")

            // Si no se encuentra un usuario redirige al usuario nuevamente a la página de inicio de sesión
            if(!userfound){
                res.render("userLogin1") 
            } else{
                // Compara contraseña con la de base Datos
                const matchPassword = await User.comparePassword(req.body.password, userfound.password)
                
                if(!matchPassword){res.render("userLogin1")}
                
                if(matchPassword){
                    // Si la contraseña coincide, se crea un token JWT y se almacena en una cookie
                    const token =  jwt.sign({id:userfound._id}, SECRET,{
                        expiresIn: 86400    
                    })

                    res.cookie("jwt", token, {
                        httpOnly: true,
                        maxAge: 10000000000,
                        secure: true, // Debería ser true si estás utilizando HTTPS
                        sameSite: "none", // Para permitir solicitudes desde otras páginas
                    });


                    
                    console.log("login exitoso y render index")
                    // Renderiza Index
                    return res.redirect("/")
                }
        
            }

        } catch (error) {
            return res.status(400).json({
                message: "A ocurrido un error",
                error: error.message
            })
        }

    }


export const logout = async function(req,res){
        // Eliminar la cookie JWT
        res.clearCookie('jwt');
        // Redirigir al usuario a la página de inicio de sesión
        res.render("userLogin1"); // Ajusta la ruta según tu configuración
    }