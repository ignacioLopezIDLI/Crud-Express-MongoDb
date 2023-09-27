import { Router } from "express"
const router = Router()

import * as userCtrl from "../controllers/user.controller"
import { authJwt,verifySignup } from "../middlewares"
import * as authCtrl from "../controllers/auth.controller"
import { verifyToken } from "../middlewares/authJwt"

// Ruta Crear User
router.post("/",[
    authJwt.verifyToken,
    authJwt.isAdmin,
    verifySignup.checkRolesExisted,
    verifySignup.checkDuplicateUsernameOrEmail
],userCtrl.createU)


// Ruta GET Render User

router.get("/user",authJwt.verifyToken,userCtrl.renderUser)


// Ruta Eliminar Usuario 
router.get("/user/:id/delete",authJwt.verifyToken,userCtrl.deleteUser)


// Ruta Actulizar Usuario Buscar Info
router.get("/user/:id/edit",authJwt.verifyToken,userCtrl.renderUserEdit)

// Ruta Actulizar Usuario Guardar Info

router.post("/user/:id/edit",authJwt.verifyToken,userCtrl.updateUser)



export default router