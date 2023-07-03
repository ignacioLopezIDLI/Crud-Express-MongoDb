import { Router } from "express"
import { createTask, deleteTask, renderTask, renderTaskEdit, updateDoneTask, updateTask } from "../controllers/task.controller"

const router = Router() 

// Ruta GET  Traer Tareas
router.get("/",renderTask)


// Ruta POST Hacer tareas
router.post("/tasks/add",createTask)


// Editar 1 Buscar info 
router.get("/edit/:id", renderTaskEdit)

// Editar 2 Guardar info
router.post("/edit/:id", updateTask)

// Eliminar 
router.get("/delete/:id", deleteTask)

// Cambiar estado de Tareas

router.get("/toggleDone/:id",updateDoneTask )


export default router