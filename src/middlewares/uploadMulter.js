const multer = require("multer");

// Configuración de multer para manejar la carga de archivos
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // Permitir cualquier tipo de archivo
  cb(null, true);
};


const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // Aquí puedes ajustar el límite de tamaño (10 MB en este caso)
  },
});

module.exports = upload;
