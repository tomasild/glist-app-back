const Song = require("../models/song");
const Album = require("../models/album");

const songController = {
  getAllSongs: async (req, res) => {
    try {
      const songs = await Song.find().populate("albumId");
      res.json(songs);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al obtener las canciones", error: error.message });
    }
  },

  getSongById: async (req, res) => {
    try {
      const song = await Song.findById(req.params.id).populate("albumId");
      if (!song) {
        return res.status(404).json({ message: "Canción no encontrada" });
      }
      res.json(song);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al obtener la canción", error: error.message });
    }
  },

  getSongsByAlbumId: async (req, res) => {
    try {
      const songs = await Song.find({ albumId: req.params.albumId });
      res.json(songs);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener las canciones del álbum",
        error: error.message,
      });
    }
  },

  addSong: async (req, res) => {
    try {
      const { title, duration, albumId } = req.body;
      const file = req.file.path;

      const album = await Album.findById(albumId);
      if (!album) {
        return res.status(404).json({ message: "Álbum no encontrado" });
      }

      const newSong = new Song({
        title,
        duration,
        albumId,
        file,
      });

      const savedSong = await newSong.save();
      res.status(201).json(savedSong);
    } catch (error) {
      res.status(500).json({ message: "Error al agregar la canción", error: error.message });
    }
  },

  updateSong: async (req, res) => {
    try {
      const { title, duration, albumId } = req.body;
      const album = await Album.findById(albumId);
      if (!album) {
        return res.status(404).json({ message: "Álbum no encontrado" });
      }

      const updatedSong = await Song.findByIdAndUpdate(
        req.params.id,
        {
          title,
          duration,
          albumId,
        },
        { new: true }
      ).populate("albumId");
      res.json(updatedSong);
    } catch (error) {
      res
        .status(400)
        .json({ message: "Error al modificar la canción", error: error.message });
    }
  },

  deleteSong: async (req, res) => {
    try {
      const deletedSong = await Song.findByIdAndRemove(req.params.id);
      res.json(deletedSong);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al eliminar la canción", error: error.message });
    }
  },
};

module.exports = songController;
