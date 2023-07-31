import { Router } from "express"    
import { createTask, deleteTask, renderTask, renderTaskEdit, updateDoneTask, updateTask } from "../controllers/task.controller"
import { verifyToken } from "../middlewares"
const router = Router() 

// Ruta GET  Traer Tareas
router.get("/",renderTask)

// Ruta POST Hacer tareas
router.post("/tasks/add",verifyToken,createTask)

// Editar 1 Buscar info 
router.get("/tasks/:id/edit", renderTaskEdit)

// Editar 2 Guardar info
router.post("/tasks/:id/edit", updateTask)

// Eliminar 
router.get("/tasks/:id/delete",verifyToken, deleteTask)

// Cambiar estado de Tareas

router.get("/tasks/:id/toggleDone",updateDoneTask )


export default router