// Importar los modelos de datos 'Song' y 'Album'
const Song = require("../models/song");
const Album = require("../models/album");
const mongoose = require("mongoose");
const fs = require("fs");

// Controlador de canciones con funciones CRUD
const songController = {
  // Obtener todas las canciones con detalles del álbum asociado
  getAllSongs: async (req, res) => {
    try {
      // Obtener todas las canciones y usar 'populate' para cargar los detalles del álbum asociado
      const songs = await Song.find().populate("albumId");
      res.json(songs);
    } catch (error) {
      // En caso de error, responder con un mensaje de error y código de estado 500 (Internal Server Error)
      res.status(500).json({ message: "Error al obtener las canciones", error: error.message });
    }
  },

  // Obtener una canción por su ID con detalles del álbum asociado
  getSongById: async (req, res) => {
    try {
      // Obtener la canción por su ID y cargar los detalles del álbum asociado utilizando 'populate'
      const song = await Song.findById(req.params.id).populate("albumId");
      if (!song) {
        // Si no se encuentra la canción, responder con un mensaje de error y código de estado 404 (Not Found)
        return res.status(404).json({ message: "Canción no encontrada" });
      }
      res.json(song);
    } catch (error) {
      // En caso de error, responder con un mensaje de error y código de estado 500 (Internal Server Error)
      res.status(500).json({ message: "Error al obtener la canción", error: error.message });
    }
  },

  // Obtener todas las canciones de un álbum específico por su ID
  getSongsByAlbumId: async (req, res) => {
    try {
      // Obtener todas las canciones que tienen el campo 'albumId' igual al ID proporcionado en la URL
      const songs = await Song.find({ albumId: req.params.albumId });
      res.json(songs);
    } catch (error) {
      // En caso de error, responder con un mensaje de error y código de estado 500 (Internal Server Error)
      res.status(500).json({ message: "Error al obtener las canciones del álbum", error: error.message });
    }
  },

  // Obtener el archivo de audio de una canción por su ID
  getAudioFile: async (req, res) => {
    try {
      // Obtener la canción por su ID
      const song = await Song.findById(req.params.id);
      if (!song) {
        // Si no se encuentra la canción, responder con un mensaje de error y código de estado 404 (Not Found)
        return res.status(404).json({ message: "Canción no encontrada" });
      }

      // Convertir el campo 'file' de BinData a un buffer de audio
      const audioBuffer = Buffer.from(song.file.buffer, "base64");

      // Configurar los encabezados de la respuesta para el tipo de contenido y la descarga del archivo
      res.set({
        "Content-Type": "audio/mpeg", // Ajustar el tipo de contenido según el formato del archivo de audio
        "Content-Disposition": `attachment; filename=${song.title}.mp3`, // Puedes ajustar el nombre de archivo aquí
      });

      // Transmitir el buffer del archivo de audio como respuesta
      res.send(audioBuffer);
    } catch (error) {
      // En caso de error, responder con un mensaje de error y código de estado 500 (Internal Server Error)
      res.status(500).json({ message: "Error al obtener el archivo de audio", error: error.message });
    }
  },

  // Agregar una nueva canción a un álbum específico por su ID
  addSong: async (req, res) => {
    try {
      // Extraer los datos de la canción y el archivo de música como buffer desde el cuerpo de la solicitud
      const { title, duration, albumId } = req.body;
      const fileBuffer = req.file.buffer;

      // Buscar el álbum asociado por su ID
      const album = await Album.findById(albumId);
      if (!album) {
        // Si no se encuentra el álbum, responder con un mensaje de error y código de estado 404 (Not Found)
        return res.status(404).json({ message: "Álbum no encontrado" });
      }

      // Crear una nueva instancia del modelo 'Song' con los datos proporcionados y el buffer del archivo de música
      const newSong = new Song({
        title,
        duration,
        albumId,
        file: fileBuffer, // Guardamos el buffer del archivo en lugar de la ruta del sistema de archivos
      });

      // Guardar la nueva canción en la base de datos
      const savedSong = await newSong.save();

      // Responder con la canción recién creada y código de estado 201 (Created)
      res.status(201).json(savedSong);
    } catch (error) {
      // En caso de error, responder con un mensaje de error y código de estado 500 (Internal Server Error)
      res.status(500).json({ message: "Error al agregar la canción", error: error.message });
    }
  },

  // Eliminar una canción por su ID
  deleteSong: async (req, res) => {
    try {
      // Obtener el ID de la canción desde la URL
      const songId = req.params.id;
      console.log("Deleting song with ID:", songId);

      // Eliminar la canción de la base de datos utilizando el método 'findByIdAndDelete'
      await Song.findByIdAndDelete(songId);

      // Responder con un mensaje de éxito y código de estado 200 (OK)
      res.status(200).json({ message: "Canción eliminada correctamente" });
    } catch (error) {
      // En caso de error, responder con un mensaje de error y código de estado 500 (Internal Server Error)
      console.error("Error al eliminar la canción:", error);
      res.status(500).json({ error: "Error al eliminar la canción" });
    }
  },
};

// Exportar el controlador de canciones
module.exports = songController;
