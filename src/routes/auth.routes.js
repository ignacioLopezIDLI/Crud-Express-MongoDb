import { Router } from "express" 
const router = Router() 

import * as authCtrl from "../controllers/auth.controller"
import { verifySignup } from "../middlewares"

// Ruta para Crear user
router.post("/signup",[verifySignup.checkDuplicateUsernameOrEmail,verifySignup.checkRolesExisted], authCtrl.signup)

// Ruta para Iniciar Sesion 
router.post("/signin",authCtrl.login)

// Ruta para Renderizar Login
router.get("/signin",authCtrl.renderLogin1)
export default router