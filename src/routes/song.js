// src/routes/songRoutes.js

const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router(); // Crear un router de Express para definir las rutas específicas de este archivo
const Song = require("../models/song"); // Importar el modelo "Song" para interactuar con la base de datos
const Album = require("../models/album"); // Importar el modelo "Album" para obtener información sobre los álbumes relacionados



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
router.get("/", async (req, res) => {
  try {
    // Buscar todas las canciones en la base de datos y también obtener información sobre el álbum asociado a cada canción (usando populate)
    const songs = await Song.find().populate("albumId");
    res.json(songs); // Enviar la lista de canciones como respuesta en formato JSON
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener las canciones",
      error: error.message,
    }); // Si ocurre un error, responder con un mensaje de error y código de estado 500
  }
});

// Obtener una canción por su ID
router.get("/:id", async (req, res) => {
  try {
    // Buscar una canción por su ID en la base de datos y también obtener información sobre el álbum asociado a la canción (usando populate)
    const song = await Song.findById(req.params.id).populate("album");
    if (!song) {
      return res.status(404).json({ message: "Canción no encontrada" }); // Si la canción no existe, responder con un mensaje de error y código de estado 404 (no encontrado)
    }
    res.json(song); // Si se encuentra la canción, enviarla como respuesta en formato JSON
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener la canción", error: error.message }); // Si ocurre un error, responder con un mensaje de error y código de estado 500
  }
});

router.get("/album/:albumId", async (req, res) => {
  try {
    const songs = await Song.find({ albumId: req.params.albumId });
    res.json(songs);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener las canciones del álbum",
      error: error.message,
    });
  }
});

// Agregar una nueva canción
router.post("/", upload.single("audioFile"), async (req, res) => {
  try {
    const { title, duration, albumId } = req.body;
    const file = req.file.path;

    // Crear un nuevo objeto "Song" con los datos proporcionados y la ruta del archivo de música
    const newSong = new Song({
      title,
      duration,
      albumId,
      file, // Asignamos la ruta del archivo al campo "file" del modelo de canción
    });

    // Guardar la nueva canción en la base de datos
    const savedSong = await newSong.save();
    res.status(201).json(savedSong); // Responder con la canción recién creada y un código de estado 201 (creado exitosamente)
  } catch (error) {
    console.error("Error al agregar la canción:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});




// Modificar una canción por su ID
router.put("/:id", async (req, res) => {
  try {
    // Extraer los datos actualizados de la canción desde el cuerpo de la solicitud
    const { title, duration, albumId } = req.body;
    // Buscar el álbum asociado a la canción actualizada por su ID
    const album = await Album.findById(albumId);
    if (!album) {
      return res.status(404).json({ message: "Álbum no encontrado" }); // Si el álbum no existe, responder con un mensaje de error y código de estado 404 (no encontrado)
    }

    // Buscar la canción por su ID y actualizar sus campos con los nuevos datos proporcionados y el ID del álbum asociado
    const updatedSong = await Song.findByIdAndUpdate(
      req.params.id,
      {
        title,
        duration,
        album: album._id,
      },
      { new: true }
    ).populate("album");
    res.json(updatedSong); // Responder con la canción actualizada en formato JSON
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al modificar la canción", error: error.message }); // Si ocurre un error, responder con un mensaje de error y código de estado 400 (solicitud incorrecta)
  }
});

// Eliminar una canción por su ID
router.delete("/:id", async (req, res) => {
  try {
    // Buscar la canción por su ID y eliminarla de la base de datos
    const deletedSong = await Song.findByIdAndRemove(req.params.id);
    res.json(deletedSong); // Responder con la canción eliminada en formato JSON
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar la canción", error: error.message }); // Si ocurre un error, responder con un mensaje de error y código de estado 500
  }
});

module.exports = router; // Exportar el router para que pueda ser utilizado en otras partes de la aplicación
