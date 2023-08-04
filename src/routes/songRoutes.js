const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const songController = require("../controllers/songController");
const upload = require("../middlewares/uploadMulter"); 


// Obtener todas las canciones
router.get("/", songController.getAllSongs);

// Obtener una canción por su ID
router.get("/:id", songController.getSongById);

// Obtener todas las canciones de un álbum por su ID
router.get("/album/:albumId", songController.getSongsByAlbumId);

// Ruta para obtener el archivo de audio por su ID
router.get("/:id/audio", songController.getAudioFile);

// Ruta para crear una nueva canción (POST)
router.post("/", upload.single("file"), songController.addSong); 

// Modificar una canción por su ID
router.put("/:id", songController.updateSong);

// Ruta para eliminar una canción por su ID
router.delete("/:id", songController.deleteSong);

module.exports = router;
