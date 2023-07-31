const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const fs = require("fs");
const multer = require("multer");

const app = express();

// Middleware para procesar el archivo de audio con multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const songsUploadsDir = path.join(__dirname, "uploads", "songs");
    if (!fs.existsSync(songsUploadsDir)) {
      fs.mkdirSync(songsUploadsDir, { recursive: true });
    }
    cb(null, songsUploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Conexión a la base de datos MongoDB
const MONGODB_URI = process.env.MONGODB_URI;
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Rutas: Definición de las rutas y sus controladores
const songRoutes = require("./src/routes/songRoutes");
const albumRoutes = require("./src/routes/albumRoutes");

app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);

// Iniciar el servidor y escuchar las solicitudes entrantes en el puerto especificado
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
