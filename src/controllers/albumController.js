const Album = require("../models/album");
const Song = require("../models/song")

const albumController = {
  getAllAlbums: async (req, res) => {
    try {
      const albums = await Album.find();
      res.json(albums);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al obtener los álbumes", error: error.message });
    }
  },

  getAlbumById: async (req, res) => {
    try {
      const album = await Album.findById(req.params.id);
      if (!album) {
        return res.status(404).json({ message: "Álbum no encontrado" });
      }
      res.json(album);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al obtener el álbum", error: error.message });
    }
  },

  addAlbum: async (req, res) => {
    try {
      const newAlbum = new Album({
        title: req.body.title,
        year: req.body.year,
      });
      const savedAlbum = await newAlbum.save();
      res.status(201).json(savedAlbum);
    } catch (error) {
      res
        .status(400)
        .json({ message: "Error al agregar el álbum", error: error.message });
    }
  },

  updateAlbum: async (req, res) => {
    try {
      const updatedAlbum = await Album.findByIdAndUpdate(
        req.params.id,
        {
          title: req.body.title,
          year: req.body.year,
        },
        { new: true }
      );
      res.json(updatedAlbum);
    } catch (error) {
      res
        .status(400)
        .json({ message: "Error al modificar el álbum", error: error.message });
    }
  },

  deleteAlbum: async (req, res) => {
    try {
      const albumId = req.params.id;

      // Eliminar todas las canciones asociadas al álbum primero
      await Song.deleteMany({ albumId });

      // Luego eliminar el álbum
      await Album.deleteOne({ _id: albumId });

      res.json({ message: "Álbum y canciones eliminadas correctamente" });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar el álbum", error: error.message });
    }
  },
};

module.exports = albumController;
