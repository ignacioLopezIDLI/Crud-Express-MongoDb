import { Router } from "express"    
import { createTask, deleteTask, renderTask, renderTaskEdit, updateDoneTask, updateTask } from "../controllers/task.controller"
import { authJwt, verifyToken } from "../middlewares"
const router = Router() 

// Ruta GET  Traer Tareas
router.get("/",renderTask)

// Ruta POST Hacer tareas
router.post("/tasks/add",createTask)

// Editar 1 Buscar info 
router.get("/tasks/:id/edit",authJwt.verifyToken, renderTaskEdit)

// Editar 2 Guardar info
router.post("/tasks/:id/edit",authJwt.verifyToken, updateTask)

// Eliminar 
router.get("/tasks/:id/delete",[authJwt.verifyToken,authJwt.isAdmin], deleteTask)

// Cambiar estado de Tareas

router.get("/tasks/:id/toggleDone",updateDoneTask )


export default router