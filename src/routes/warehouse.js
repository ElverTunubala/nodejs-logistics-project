import { Router } from 'express';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const routerWarehouse = Router();
const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

const warehouseFilePath = path.join(_dirname, '../../data/warehouse.json');

const readTasks = async () => {
  try {
    const warehouseData = await fs.readFile(warehouseFilePath, 'utf-8');
    return JSON.parse(warehouseData);
  }
  catch (error) {
    throw new Error(`Error en la promesa ${error}`);
  }
};

const writeWarehouse = async (warehouse) => {
  await fs.writeFile(warehouseFilePath, JSON.stringify(warehouse, null, 2));
};

routerWarehouse.post('/', async (req, res) => {
  try {
    const warehouse = await readTasks();
    const newTask = {
      id: warehouse.length + 1,
      name: req.body.name,
      location: req.body.location,
    };
    warehouse.push(newTask);
    await writeWarehouse(warehouse);
    res.status(201).json({ message: 'warehouse creado exitosamente', warehouse: newTask });
  }
  catch (error) {
    res.status(500).json({ message: `Error al crear warehouse: ${error.message}` });
  }
});

routerWarehouse.get('/', async (req, res) => {
  try {
    const warehouse = await readTasks();
    res.json(warehouse);

  }catch (error) {
    res.status(500).json({ message: `Error al obtener warehouse: ${error.message}` });
  }
});

routerWarehouse.get('/:id', async (req, res) => {
  try {
    const tasks = await readTasks();
    const warehouse = tasks.find((t) => t.id === parseInt(req.params.id));
    if (!warehouse) {
      return res.status(404).json({ message: 'warehouse no encontrado' });
    }
    res.json(warehouse);
  } catch (error) {
    res.status(500).json({ message: `Error al obtener warehouse: ${error.message}` });
  }
});

routerWarehouse.put('/:id', async (req, res) => {
  try {
    const warehouse = await readTasks();
    const taskIndex = warehouse.findIndex((t) => t.id === parseInt(req.params.id));
    if (taskIndex === -1) {
      return res.status(404).json({ message: 'warehouse no encontrado' });
    }
    const updatedTask = {
      ...warehouse[taskIndex],
      name: req.body.name,
      location: req.body.location,
    };
    warehouse[taskIndex] = updatedTask;
    await writeWarehouse(tasks);
    res.json({ message: 'warehouse actualizado exitosamente', task: updatedTask });

  }catch (error) {
    res.status(500).json({ message: `Error al actualizar warehouse: ${error.message}` });
  }
});

routerWarehouse.delete('/:id', async (req, res) => {
  try {
    const warehouse = await readTasks();
    const newTasks = warehouse.filter((t) => t.id !== parseInt(req.params.id));

    if (warehouse.length === newTasks.length) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    await writeWarehouse(newTasks);
    res.json({ message: 'warehouse eliminado exitosamente' });

  } catch (error) {
    res.status(500).json({ message: `Error al eliminar warehouse: ${error.message}` });
  }
});

export default routerWarehouse;
