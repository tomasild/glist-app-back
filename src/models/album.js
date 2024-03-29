const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    year: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

albumSchema.pre("remove", async function (next) {
  // Elimina todas las canciones asociadas al album
  await this.model("Song").deleteMany({ albumId: this._id });
  next();
});

const Album = mongoose.model("Album", albumSchema);

module.exports = Album;
