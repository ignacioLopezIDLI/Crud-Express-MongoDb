import { Router } from "express"
const router = Router()

import * as userCtrl from "../controllers/user.controller"
import { authJwt,verifySignup } from "../middlewares"

// Ruta Crear User
router.post("/",[
    authJwt.verifyToken,
    authJwt.isAdmin,
    verifySignup.checkRolesExisted,
    verifySignup.checkDuplicateUsernameOrEmail
],userCtrl.createU)


// Ruta GET Render User

router.get("/",userCtrl.renderUser)


// Ruta Eliminar Usuario 
router.get("/:id/delete",userCtrl.deleteUser)


export default router