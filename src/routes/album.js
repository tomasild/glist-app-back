// src/routes/albumRoutes.js

const express = require("express");
const router = express.Router(); // Crear un router de Express para definir las rutas específicas de este archivo
const Album = require("../models/album"); // Importar el modelo "Album" para interactuar con la base de datos

// Obtener todos los álbumes
router.get("/", async (req, res) => {
  try {
    const albums = await Album.find(); // Buscar todos los álbumes en la base de datos
    res.json(albums); // Enviar la lista de álbumes como respuesta en formato JSON
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los álbumes", error: error.message }); // Si ocurre un error, responder con un mensaje de error y código de estado 500
  }
});

// Obtener un álbum por su ID
router.get("/:id", async (req, res) => {
  try {
    const album = await Album.findById(req.params.id); // Buscar un álbum por su ID en la base de datos
    if (!album) {
      return res.status(404).json({ message: "Álbum no encontrado" }); // Si el álbum no existe, responder con un mensaje de error y código de estado 404 (no encontrado)
    }
    res.json(album); // Si se encuentra el álbum, enviarlo como respuesta en formato JSON
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener el álbum", error: error.message }); // Si ocurre un error, responder con un mensaje de error y código de estado 500
  }
});

// Agregar un nuevo álbum
router.post("/", async (req, res) => {
  try {
    // Crear un nuevo objeto "Album" con los datos proporcionados en el cuerpo de la solicitud
    const newAlbum = new Album({
      title: req.body.title,
      year: req.body.year,
    });
    // Guardar el nuevo álbum en la base de datos
    const savedAlbum = await newAlbum.save();
    res.status(201).json(savedAlbum); // Responder con el álbum recién creado y un código de estado 201 (creado exitosamente)
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al agregar el álbum", error: error.message }); // Si ocurre un error, responder con un mensaje de error y código de estado 400 (solicitud incorrecta)
  }
});

// Modificar un álbum por su ID
router.put("/:id", async (req, res) => {
  try {
    // Buscar el álbum por su ID y actualizar sus campos con los datos proporcionados en el cuerpo de la solicitud
    const updatedAlbum = await Album.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        year: req.body.year,
      },
      { new: true }
    );
    res.json(updatedAlbum); // Responder con el álbum actualizado en formato JSON
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al modificar el álbum", error: error.message }); // Si ocurre un error, responder con un mensaje de error y código de estado 400 (solicitud incorrecta)
  }
});

// Eliminar un álbum por su ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedAlbum = await Album.findByIdAndRemove(req.params.id); // Buscar el álbum por su ID y eliminarlo de la base de datos
    res.json(deletedAlbum); // Responder con el álbum eliminado en formato JSON
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar el álbum", error: error.message }); // Si ocurre un error, responder con un mensaje de error y código de estado 500
  }
});

module.exports = router; // Exportar el router para que pueda ser utilizado en otras partes de la aplicación
