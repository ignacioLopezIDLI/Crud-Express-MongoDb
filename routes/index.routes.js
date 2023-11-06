"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _task = require("../controllers/task.controller");
var router = (0, _express.Router)();

// Ruta GET  Traer Tareas
router.get("/", _task.renderTask);

// Ruta POST Hacer tareas
router.post("/tasks/add", _task.createTask);

// Editar 1 Buscar info 
router.get("/tasks/:id/edit", _task.renderTaskEdit);

// Editar 2 Guardar info
router.post("/tasks/:id/edit", _task.updateTask);

// Eliminar 
router.get("/tasks/:id/delete", _task.deleteTask);

// Cambiar estado de Tareas

router.get("/tasks/:id/toggleDone", _task.updateDoneTask);
var _default = router;
exports["default"] = _default;