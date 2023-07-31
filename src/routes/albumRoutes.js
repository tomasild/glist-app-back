const express = require("express");
const router = express.Router();
const albumController = require("../controllers/albumController");

// Obtener todos los álbumes
router.get("/", albumController.getAllAlbums);

// Obtener un álbum por su ID
router.get("/:id", albumController.getAlbumById);

// Agregar un nuevo álbum
router.post("/", albumController.addAlbum);

// Modificar un álbum por su ID
router.put("/:id", albumController.updateAlbum);

// Eliminar un álbum por su ID
router.delete("/:id", albumController.deleteAlbum);

module.exports = router;
