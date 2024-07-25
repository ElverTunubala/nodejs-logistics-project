import { Router } from 'express';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const routerShipment = Router();
const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

const shipmentFilePath = path.join(_dirname, '../../data/shipment.json');

const readShipments = async () => {
  try {
    const shipmentData = await fs.readFile(shipmentFilePath, 'utf-8');
    return JSON.parse(shipmentData);
  } catch (error) {
    throw new Error(`Error en la promesa ${error}`);
  }
};

const writeShipments = async (shipments) => {
  await fs.writeFile(shipmentFilePath, JSON.stringify(shipments, null, 2));
};

routerShipment.post('/', async (req, res) => {
  try {
    const shipments = await readShipments();
    const newShipment = {
      id: shipments.length + 1,
      item: req.body.item,
      quantity: req.body.quantity,
    };
    shipments.push(newShipment);
    await writeShipments(shipments);
    res.status(201).json({ message: 'Shipment creado exitosamente', shipment: newShipment });
  } catch (error) {
    res.status(500).json({ message: `Error al crear shipment: ${error.message}` });
  }
});

routerShipment.get('/', async (req, res) => {
  try {
    const shipments = await readShipments();
    res.json(shipments);
  } catch (error) {
    res.status(500).json({ message: `Error al obtener shipments: ${error.message}` });
  }
});

routerShipment.get('/:id', async (req, res) => {
  try {
    const shipments = await readShipments();
    const shipment = shipments.find((s) => s.id === parseInt(req.params.id));
    if (!shipment) {
      return res.status(404).json({ message: 'Shipment no encontrado' });
    }
    res.json(shipment);
  } catch (error) {
    res.status(500).json({ message: `Error al obtener shipment: ${error.message}` });
  }
});

routerShipment.put('/:id', async (req, res) => {
  try {
    const shipments = await readShipments();
    const shipmentIndex = shipments.findIndex((s) => s.id === parseInt(req.params.id));
    if (shipmentIndex === -1) {
      return res.status(404).json({ message: 'Shipment no encontrado' });
    }
    const updatedShipment = {
      ...shipments[shipmentIndex],
      item: req.body.item,
      quantity: req.body.quantity,
    };
    shipments[shipmentIndex] = updatedShipment;
    await writeShipments(shipments);
    res.json({ message: 'Shipment actualizado exitosamente', shipment: updatedShipment });
  } catch (error) {
    res.status(500).json({ message: `Error al actualizar shipment: ${error.message}` });
  }
});

routerShipment.delete('/:id', async (req, res) => {
  try {
    const shipments = await readShipments();
    const newShipments = shipments.filter((s) => s.id !== parseInt(req.params.id));

    if (shipments.length === newShipments.length) {
      return res.status(404).json({ message: 'Shipment no encontrado' });
    }
    await writeShipments(newShipments);
    res.json({ message: 'Shipment eliminado exitosamente' });
  } catch (error) {
    res.status (500).json({ message: `Error al eliminar shipment: ${error.message}` });
  }
});

export default routerShipment;
