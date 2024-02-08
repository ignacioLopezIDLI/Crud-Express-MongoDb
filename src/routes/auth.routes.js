import { Router } from "express" 
const router = Router() 

import * as authCtrl from "../controllers/auth.controller"
import { verifySignup } from "../middlewares"

// Ruta para Crear user
router.post("/signup",[verifySignup.checkDuplicateUsernameOrEmail,verifySignup.checkRolesExisted], authCtrl.signup)

// Ruta para Renderizar Login
router.get("/signup",authCtrl.renderSignup)

// Ruta para Iniciar Sesion 
router.post("/signin",authCtrl.login)

// Ruta para Renderizar Login
router.get("/signin",authCtrl.renderLogin1)

// Ruta para Cerrar sesión
router.get("/logout",authCtrl.logout)

export default router