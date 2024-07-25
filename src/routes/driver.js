import { Router } from 'express';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const routerDriver = Router();
const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

const driverFilePath = path.join(_dirname, '../../data/driver.json');

const readDrivers = async () => {
  try {
    const driverData = await fs.readFile(driverFilePath, 'utf-8');
    return JSON.parse(driverData);
  } catch (error) {
    throw new Error(`Error en la promesa ${error}`);
  }
};

const writeDrivers = async (drivers) => {
  await fs.writeFile(driverFilePath, JSON.stringify(drivers, null, 2));
};

routerDriver.post('/', async (req, res) => {
  try {
    const drivers = await readDrivers();
    const newDriver = {
      id: drivers.length + 1,
      name: req.body.name,
    };
    drivers.push(newDriver);
    await writeDrivers(drivers);
    res.status(201).json({ message: 'Driver creado exitosamente', driver: newDriver });

  } catch (error) {
    res.status(500).json({ message: `Error al crear driver: ${error.message}` });
  }
});

routerDriver.get('/', async (req, res) => {
  try {
    const drivers = await readDrivers();
    res.json(drivers);

  } catch (error) {
    res.status(500).json({ message: `Error al obtener drivers: ${error.message}` });
  }
});

routerDriver.get('/:id', async (req, res) => {
  try {
    const drivers = await readDrivers();
    const driver = drivers.find((d) => d.id === parseInt(req.params.id));
    if (!driver) {
      return res.status(404).json({ message: 'Driver no encontrado' });
    }
    res.json(driver);
  } catch (error) {
    res.status(500).json({ message: `Error al obtener driver: ${error.message}` });
  }
});

routerDriver.put('/:id', async (req, res) => {
  try {
    const drivers = await readDrivers();
    const driverIndex = drivers.findIndex((d) => d.id === parseInt(req.params.id));

    if (driverIndex === -1) {
      return res.status(404).json({ message: 'Driver no encontrado' });
    }
    const updatedDriver = {
      ...drivers[driverIndex],
      name: req.body.name,
    };
    drivers[driverIndex] = updatedDriver;
    await writeDrivers(drivers);
    res.json({ message: 'Driver actualizado exitosamente', driver: updatedDriver });

  } catch (error) {
    res.status(500).json({ message: `Error al actualizar driver: ${error.message}` });
  }
});

routerDriver.delete('/:id', async (req, res) => {
  try {
    const drivers = await readDrivers();
    const newDrivers = drivers.filter((d) => d.id !== parseInt(req.params.id));

    if (drivers.length === newDrivers.length) {
      return res.status(404).json({ message: 'Driver no encontrado' });
    }
    await writeDrivers(newDrivers);
    res.json({ message: 'Driver eliminado exitosamente' });
    
  } catch (error) {
    res.status(500).json({ message: `Error al eliminar driver: ${error.message}` });
  }
});

export default routerDriver;
