import Task from "../models/Task" 

// Ruta GET Renderizar Tareas 
 export const renderTask = async(req,res)=>{
    const tasks = await Task.find().lean() // .lean() Transforma objetos de MongoDB a objetos js

    res.render("index",{tasks : tasks}) // Da info de BD para renderizar 
}

// Ruta POST Hacer Tareas

export const createTask = async (req,res)=>{
    try {
        const task = Task(req.body)
        await task.save()
        res.redirect("/")
    } catch (error) {
        console.log(error);
    }
    
}

// Editar 1 Render Task Edit 

export const renderTaskEdit = async (req,res)=>{
    try {
        const task = await Task.findById(req.params.id).lean() // Busca Tarea x ID 
        res.render("edit", {task})   // Pasa la info buscada 
    } catch (error) {
        console.log(error.message);
    }
}

// Editar 2 Guardar info
export const updateTask = async (req,res)=>{
    const { id } = req.params
    await Task.findByIdAndUpdate(id, req.body)
    res.redirect("/")
}

// Eliminar
export const deleteTask = async (req,res)=>{
    const {id} = req.params

    await Task.findByIdAndDelete(id)
    
    res.redirect("/")
}

// Cambiar estado de Tareas
export const updateDoneTask = async (req,res)=>{
    const {id} = req.params

    const task = await Task.findById(id)

    task.done = !task.done

    await task.save()

    res.redirect("/")

}