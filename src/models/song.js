const mongoose = require("mongoose");

const songSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    duration: { type: String, required: true },
    albumId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Album",
      required: true,
    },
    file: { type: String, required: true }, // Ruta del archivo de la canción en el sistema de archivos
  },
  {
    timestamps: true,
  }
);

const Song = mongoose.model("Song", songSchema);

module.exports = Song;
