import { Router } from 'express';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const routerTask = Router();
const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

const tasksFilePath = path.join(_dirname, '../../data/tasks.json');

const readTasks = async () => {
  try {
    const tasksData = await fs.readFile(tasksFilePath, 'utf-8');
    return JSON.parse(tasksData);
  } catch (error) {
    throw new Error(`Error en la promesa ${error}`);
  }
};

const writeTasks = async (tasks) => {
  await fs.writeFile(tasksFilePath, JSON.stringify(tasks, null, 2));
};

routerTask.post('/', async (req, res) => {
  try {
    const tasks = await readTasks();
    const newTask = {
      id: tasks.length + 1,
      title: req.body.title,
      genre: req.body.genre,
      studioId: req.body.studioId,
    };
    tasks.push(newTask);
    await writeTasks(tasks);
    res.status(201).json({ message: 'Anime creado exitosamente', anime: newTask });
  } catch (error) {
    res.status(500).json({ message: `Error al crear anime: ${error.message}` });
  }
});

routerTask.get('/', async (req, res) => {
  try {
    const tasks = await readTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: `Error al obtener animes: ${error.message}` });
  }
});

routerTask.get('/:id', async (req, res) => {
  try {
    const tasks = await readTasks();
    const task = tasks.find((t) => t.id === parseInt(req.params.id));
    if (!task) {
      return res.status(404).json({ message: 'Anime no encontrado' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: `Error al obtener anime: ${error.message}` });
  }
});

routerTask.put('/:id', async (req, res) => {
  try {
    const tasks = await readTasks();
    const taskIndex = tasks.findIndex((t) => t.id === parseInt(req.params.id));
    if (taskIndex === -1) {
      return res.status(404).json({ message: 'Anime no encontrado' });
    }
    const updatedTask = {
      ...tasks[taskIndex],
      title: req.body.title,
      genre: req.body.genre,
      studioId: req.body.studioId,
    };
    tasks[taskIndex] = updatedTask;
    await writeTasks(tasks);
    res.json({ message: 'Anime actualizado exitosamente', task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: `Error al actualizar anime: ${error.message}` });
  }
});

routerTask.delete('/:id', async (req, res) => {
  try {
    const tasks = await readTasks();
    const newTasks = tasks.filter((t) => t.id !== parseInt(req.params.id));
    if (tasks.length === newTasks.length) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    await writeTasks(newTasks);
    res.json({ message: 'Anime eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: `Error al eliminar anime: ${error.message}` });
  }
});

export default routerTask;
