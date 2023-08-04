// Importar el módulo 'multer' para manejar la carga de archivos
const multer = require("multer");

// Configuración de multer para manejar la carga de archivos en memoria (no se guarda en el sistema de archivos)
const storage = multer.memoryStorage();

// Función de filtro de archivos para determinar qué archivos se deben aceptar o rechazar
const fileFilter = (req, file, cb) => {
  // Permitir cualquier tipo de archivo al llamar a 'cb' con el primer argumento como null y el segundo argumento como true
  cb(null, true);
  // Si quieres rechazar un archivo específico, puedes llamar a 'cb' con el primer argumento como null y el segundo argumento como false
  // Esto se puede hacer, por ejemplo, verificando la extensión del archivo o su tipo MIME.
};

// Configuración completa de multer utilizando la configuración de almacenamiento personalizado y la función de filtro de archivos
const upload = multer({
  storage: storage, // Utiliza el almacenamiento en memoria que se configura anteriormente
  fileFilter: fileFilter, // Utiliza la función de filtro de archivos para aceptar o rechazar archivos
  limits: {
    fileSize: 10 * 1024 * 1024, // Límite de tamaño del archivo en bytes (10 MB en este caso)
  },
});

// Exportar el middleware de multer configurado para su uso en otros archivos
module.exports = upload;
