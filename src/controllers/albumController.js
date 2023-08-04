// Importar los modelos de datos 'Album' y 'Song'
const Album = require("../models/album");
const Song = require("../models/song");

// Controlador de álbumes con funciones CRUD
const albumController = {
  // Obtener todos los álbumes
  getAllAlbums: async (req, res) => {
    try {
      const albums = await Album.find();
      res.json(albums);
    } catch (error) {
      // En caso de error, responder con un mensaje de error y código de estado 500 (Internal Server Error)
      res
        .status(500)
        .json({ message: "Error al obtener los álbumes", error: error.message });
    }
  },

  // Obtener un álbum por su ID
  getAlbumById: async (req, res) => {
    try {
      const album = await Album.findById(req.params.id);
      if (!album) {
        // Si no se encuentra el álbum, responder con un mensaje de error y código de estado 404 (Not Found)
        return res.status(404).json({ message: "Álbum no encontrado" });
      }
      res.json(album);
    } catch (error) {
      // En caso de error, responder con un mensaje de error y código de estado 500 (Internal Server Error)
      res
        .status(500)
        .json({ message: "Error al obtener el álbum", error: error.message });
    }
  },

  // Agregar un nuevo álbum
  addAlbum: async (req, res) => {
    try {
      // Crear una nueva instancia del modelo 'Album' con los datos del cuerpo de la solicitud
      const newAlbum = new Album({
        title: req.body.title,
        year: req.body.year,
      });
      // Guardar el nuevo álbum en la base de datos
      const savedAlbum = await newAlbum.save();
      // Responder con el álbum recién creado y código de estado 201 (Created)
      res.status(201).json(savedAlbum);
    } catch (error) {
      // En caso de error, responder con un mensaje de error y código de estado 400 (Bad Request)
      res
        .status(400)
        .json({ message: "Error al agregar el álbum", error: error.message });
    }
  },

  // Actualizar un álbum existente por su ID
  updateAlbum: async (req, res) => {
    try {
      // Buscar y actualizar el álbum por su ID, con los datos proporcionados en el cuerpo de la solicitud
      const updatedAlbum = await Album.findByIdAndUpdate(
        req.params.id,
        {
          title: req.body.title,
          year: req.body.year,
        },
        { new: true } // Opción 'new: true' para devolver el álbum actualizado en la respuesta
      );
      // Responder con el álbum actualizado
      res.json(updatedAlbum);
    } catch (error) {
      // En caso de error, responder con un mensaje de error y código de estado 400 (Bad Request)
      res
        .status(400)
        .json({ message: "Error al modificar el álbum", error: error.message });
    }
  },

  // Eliminar un álbum por su ID
  deleteAlbum: async (req, res) => {
    try {
      const albumId = req.params.id;

      // Eliminar todas las canciones asociadas al álbum primero
      await Song.deleteMany({ albumId });

      // Luego eliminar el álbum
      await Album.deleteOne({ _id: albumId });

      // Responder con un mensaje de éxito
      res.json({ message: "Álbum y canciones eliminadas correctamente" });
    } catch (error) {
      // En caso de error, responder con un mensaje de error y código de estado 500 (Internal Server Error)
      res.status(500).json({ message: "Error al eliminar el álbum", error: error.message });
    }
  },
};

// Exportar el controlador de álbumes
module.exports = albumController;
