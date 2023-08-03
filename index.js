const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Conexión a la base de datos MongoDB
const MONGODB_URI = process.env.MONGODB_URI;
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Conectado a MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Error al conectar con MongoDB:", error);
  });

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Rutas: Definición de las rutas y sus controladores
const songRoutes = require("./src/routes/songRoutes"); // Asegúrate de tener la ruta correcta
const albumRoutes = require("./src/routes/albumRoutes"); // Asegúrate de tener la ruta correcta

app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);

// Iniciar el servidor y escuchar las solicitudes entrantes en el puerto especificado
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`El servidor está funcionando en http://localhost:${PORT}`);
});
