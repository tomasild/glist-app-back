// Importar los módulos necesarios
const express = require("express"); // Express.js para la creación del servidor
const mongoose = require("mongoose"); // Mongoose para trabajar con MongoDB
const morgan = require("morgan"); // Morgan para el registro de solicitudes HTTP
const cors = require("cors"); // Cors para habilitar la comunicación con diferentes dominios
require("dotenv").config(); // Dotenv para leer variables de entorno desde un archivo .env

// Crear una instancia de la aplicación de Express
const app = express();

// Conexión a la base de datos MongoDB utilizando la cadena de conexión desde la variable de entorno MONGODB_URI
const MONGODB_URI = process.env.MONGODB_URI;
mongoose
  .connect(MONGODB_URI) // Intentar conectarse a MongoDB Atlas
  .then(() => {
    console.log("Conectado a MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Error al conectar con MongoDB:", error);
  });

// Middlewares: Estos son funciones que se ejecutan antes de que las rutas se procesen para realizar tareas como el registro, análisis de solicitudes, etc.
app.use(cors()); // Habilitar el CORS para permitir que el servidor acepte solicitudes de diferentes dominios
app.use(express.json()); // Analizar el cuerpo de las solicitudes entrantes como JSON
app.use(morgan("dev")); // Usar el middleware de Morgan con el formato "dev" para registrar las solicitudes HTTP en la consola con detalles

// Rutas: Definición de las rutas y sus controladores
const songRoutes = require("./src/routes/songRoutes"); // Importar las rutas para las canciones
const albumRoutes = require("./src/routes/albumRoutes"); // Importar las rutas para los álbumes

app.use("/api/songs", songRoutes); // Usar las rutas para las canciones con el prefijo "/api/songs"
app.use("/api/albums", albumRoutes); // Usar las rutas para los álbumes con el prefijo "/api/albums"

// Iniciar el servidor y escuchar las solicitudes entrantes en el puerto especificado
const PORT = process.env.PORT || 3000; // El servidor utilizará el puerto especificado en la variable de entorno PORT, o el puerto 3000 si no está definido.
app.listen(PORT, () => {
  console.log(`El servidor está funcionando en http://localhost:${PORT}`);
});
