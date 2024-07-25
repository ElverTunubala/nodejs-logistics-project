import express from 'express'; // Importamos Express
import routerWarehouse from './routes/warehouse.js'; // Importamos las rutas de la API
import routerShipment from './routes/shipment.js';
import routerDriver from './routes/driver.js';
import errorHandler from './middlewares/errorHandler.js'; // Importamos el middleware para manejo de errores
import dotenv from 'dotenv'; // Importamos dotenv para manejar variables de entorno.

const app = express(); // Instanciamos Express
dotenv.config();
const PORT = process.env.PORT || 3010; // Puerto del servidor en donde se ejecutará la API

app.use(express.json()); // Middleware para parsear el cuerpo de las solicitudes en formato JSON. Tambien conocido como middleware de aplicacion.
app.use("/warehouse", routerWarehouse); // Middleware para manejar las rutas de la API. Tambien conocido como middleware de montaje o de enrutamiento.
app.use("/shipments", routerShipment);
app.use("/drivers",routerDriver);

app.use(errorHandler); // Middleware para manejar errores.

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
