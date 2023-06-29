import { Router } from "express"
import Task from "../models/Task"
const router = Router() 

// Ruta GET
router.get("/",async(req,res)=>{
    const tasks = await Task.find().lean() // .lean() Transforma objetos de MongoDB a objetos js

    res.render("index",{tasks : tasks}) // Da info de BD para renderizar 
})


// Ruta POST
router.post("/tasks/add",async (req,res)=>{
    try {
        const task = Task(req.body)
        await task.save()
        res.redirect("/")
    } catch (error) {
        console.log(error);
    }
    
})


router.get("/about",(req,res)=>{
    res.render("about")
})

router.get("/edit/:id", async (req,res)=>{
    try {
        const task = await Task.findById(req.params.id).lean() // Busca Tarea x ID 
        res.render("edit", {task})   // Pasa la info buscada 
    } catch (error) {
        console.log(error.message);
    }
})

router.post("/edit/:id", async (req,res)=>{
    const { id } = req.params
    await Task.findByIdAndUpdate(id, req.body)
    res.redirect("/")
})


export default router