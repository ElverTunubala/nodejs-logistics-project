import { Router } from 'express';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const routerVehicle = Router();
const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

const vehicleFilePath = path.join(_dirname, '../../data/vehicle.json');

const readVehicles = async () => {
  try {
    const vehicleData = await fs.readFile(vehicleFilePath, 'utf-8');
    return JSON.parse(vehicleData);
  } catch (error) {
    throw new Error(`Error en la promesa ${error}`);
  }
};

const writeVehicles = async (vehicles) => {
  await fs.writeFile(vehicleFilePath, JSON.stringify(vehicles, null, 2));
};

routerVehicle.post('/', async (req, res) => {
  try {
    const vehicles = await readVehicles();
    const newVehicle = {
      id: vehicles.length + 1,
      model: req.body.model,
      year: req.body.year,
    };
    vehicles.push(newVehicle);
    await writeVehicles(vehicles);
    res.status(201).json({ message: 'Vehicle creado exitosamente', vehicle: newVehicle });
  } catch (error) {
    res.status(500).json({ message: `Error al crear vehicle: ${error.message}` });
  }
});

routerVehicle.get('/', async (req, res) => {
  try {
    const vehicles = await readVehicles();
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: `Error al obtener vehicles: ${error.message}` });
  }
});

routerVehicle.get('/:id', async (req, res) => {
  try {
    const vehicles = await readVehicles();
    const vehicle = vehicles.find((v) => v.id === parseInt(req.params.id));
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle no encontrado' });
    }
    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ message: `Error al obtener vehicle: ${error.message}` });
  }
});

routerVehicle.put('/:id', async (req, res) => {
  try {
    const vehicles = await readVehicles();
    const vehicleIndex = vehicles.findIndex((v) => v.id === parseInt(req.params.id));
    if (vehicleIndex === -1) {
      return res.status(404).json({ message: 'Vehicle no encontrado' });
    }
    const updatedVehicle = {
      ...vehicles[vehicleIndex],
      model: req.body.model,
      year: req.body.year,
    };
    vehicles[vehicleIndex] = updatedVehicle;
    await writeVehicles(vehicles);
    res.json({ message: 'Vehicle actualizado exitosamente', vehicle: updatedVehicle });
  } catch (error) {
    res.status(500).json({ message: `Error al actualizar vehicle: ${error.message}` });
  }
});

routerVehicle.delete('/:id', async (req, res) => {
  try {
    const vehicles = await readVehicles();
    const newVehicles = vehicles.filter((v) => v.id !== parseInt(req.params.id));

    if (vehicles.length === newVehicles.length) {
      return res.status(404).json({ message: 'Vehicle no encontrado' });
    }
    await writeVehicles(newVehicles);
    res.json({ message: 'Vehicle eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: `Error al eliminar vehicle: ${error.message}` });
  }
});

export default routerVehicle;
