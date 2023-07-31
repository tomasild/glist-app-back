const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const songController = require("../controllers/songController");

// Configuración de multer para procesar el archivo de audio
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const songsUploadsDir = path.join(__dirname, "..", "..", "uploads", "songs");
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

// Obtener todas las canciones
router.get("/", songController.getAllSongs);

// Obtener una canción por su ID
router.get("/:id", songController.getSongById);

// Obtener todas las canciones de un álbum por su ID
router.get("/album/:albumId", songController.getSongsByAlbumId);

// Agregar una nueva canción
router.post("/", upload.single("audioFile"), songController.addSong);

// Modificar una canción por su ID
router.put("/:id", songController.updateSong);

// Eliminar una canción por su ID
router.delete("/:id", songController.deleteSong);

module.exports = router;
