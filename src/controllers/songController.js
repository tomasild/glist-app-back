const Song = require("../models/song");
const Album = require("../models/album");
const mongoose = require("mongoose");
const fs = require("fs");

const songController = {
  getAllSongs: async (req, res) => {
    try {
      const songs = await Song.find().populate("albumId");
      res.json(songs);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener las canciones", error: error.message });
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
      res.status(500).json({ message: "Error al obtener la canción", error: error.message });
    }
  },

  getSongsByAlbumId: async (req, res) => {
    try {
      const songs = await Song.find({ albumId: req.params.albumId });
      res.json(songs);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener las canciones del álbum", error: error.message });
    }
  },

  getAudioFile: async (req, res) => {
    try {
      const song = await Song.findById(req.params.id);
      if (!song) {
        return res.status(404).json({ message: "Canción no encontrada" });
      }

      // Convertir el BinData en un buffer
      const audioBuffer = Buffer.from(song.file.buffer, "base64");

      // Configurar los encabezados para el tipo de contenido y la descarga del archivo
      res.set({
        "Content-Type": "audio/mpeg", // Ajusta el tipo de contenido según el formato del archivo de audio
        "Content-Disposition": `attachment; filename=${song.title}.mp3`, // Puedes ajustar el nombre de archivo aquí
      });

      // Transmitir el buffer del archivo de audio
      res.send(audioBuffer);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener el archivo de audio", error: error.message });
    }
  },

  addSong: async (req, res) => {
    try {
      const { title, duration, albumId } = req.body;
      const fileBuffer = req.file.buffer; // El archivo de música como buffer desde multer

      const album = await Album.findById(albumId);
      if (!album) {
        return res.status(404).json({ message: "Álbum no encontrado" });
      }

      const newSong = new Song({
        title,
        duration,
        albumId,
        file: fileBuffer, // Aquí guardamos el buffer del archivo en lugar de la ruta del sistema de archivos
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
      res.status(400).json({ message: "Error al modificar la canción", error: error.message });
    }
  },

  deleteSong: async (req, res) => {
    try {
      const songId = req.params.id;
      console.log("Deleting song with ID:", songId);

      // Eliminar la canción de la base de datos utilizando el modelo Song
      await Song.findByIdAndDelete(songId);

      res.status(200).json({ message: "Canción eliminada correctamente" });
    } catch (error) {
      console.error("Error al eliminar la canción:", error);
      res.status(500).json({ error: "Error al eliminar la canción" });
    }
  },
};

module.exports = songController;
