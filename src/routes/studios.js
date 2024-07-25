// const express = require("express");
// const fs = require("fs");
// const path = require("path");

// const router = express.Router();
// const studiosFilePath = path.join(__dirname, "../../data/studios.json");

// // Leer estudios desde el archivo
// const readTasks = () => {
//   const tasksData = fs.readFileSync(studiosFilePath); // Leer el archivo. Este poderoso metodo nos permite leer archivos de manera sincrona.
//   return JSON.parse(tasksData); // Retornar los datos en formato JSON.
// };

// // Escribir tareas en el archivo
// const writeTasks = (tasks) => {
//   fs.writeFileSync(studiosFilePath, JSON.stringify(tasks, null, 2)); // Escribir los datos en el archivo. Este poderoso metodo nos permite escribir archivos de manera sincrona.
// };

// // Crear un nuevo estudio
// router.post("/", (req, res) => {
//   const studio = readTasks();
//   const newTask = {
//     id: studio.length + 1, // simulamos un id autoincrementable
//     name: req.body.name, // obtenemos el nombre del estudio desde el cuerpo de la solicitud
//   };
//   studio.push(newTask);
//   writeTasks(studio);
//   res.status(201).json({ message: "Estudio creado exitosamente", studios: newTask });
// });

// // Obtener todos los estudios
// router.get("/", (req, res) => {
//   const studios = readTasks();
//   res.json(studios);
// });

// // Obtener un estudio por ID
// router.get("/:id", (req, res) => {
//   const studios = readTasks();
//   const task = studios.find((t) => t.id === parseInt(req.params.id));
//   if (!task) {
//     return res.status(404).json({ message: "Estudio no encontrado" });
//   }
//   res.json(task);
// });

// // Actualizar un studio por ID
// router.put("/:id", (req, res) => {
//   const studios = readTasks();
//   const taskIndex = studios.findIndex((t) => t.id === parseInt(req.params.id));
//   if (taskIndex === -1) {
//     return res.status(404).json({ message: "Anime no encontrado" });
//   }
//   const updatedTask = {
//     ...studios[taskIndex],
//     name: req.body.name,
//   };
//   studios[taskIndex] = updatedTask;
//   writeTasks(studios);
//   res.json({ message: "Estudio actualizado exitosamente", studios: updatedTask });
// });

// // Eliminar un estudio por ID
// router.delete("/:id", (req, res) => {
//   const studios = readTasks();
//   const newTasks = studios.filter((t) => t.id !== parseInt(req.params.id));
//   if (studios.length === newTasks.length) {
//     return res.status(404).json({ message: "Estudio no encontrado" });
//   }
//   writeTasks(newTasks);
//   res.json({ message: "Estudio eliminado exitosamente" });
// });

// module.exports = router;