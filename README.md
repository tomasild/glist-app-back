

![Groovelist Logo](https://groovelistapplication2.s3.amazonaws.com/GrooveList/Landing+Page/logo-transparente.png) 
# Desafío Groovelist - Catálogo Musical - Backend API

Proyecto desarrollado como prueba técnica para Startup Groovelist. Esta aplicación es una herramienta de gestión de un catálogo musical, que permite listar, agregar y modificar la información de las canciones y su relación con los álbumes a los que pertenecen.
estilos.

## Características principales y tecnologías utilizadas

### Backend

- Implementación REST utilizando Node.js con Express.js como servidor.
- Base de datos MongoDB para almacenar las canciones y álbumes.
- Manejo de archivos de audio utilizando `multer`.
- Middleware de registro de solicitudes HTTP con `morgan`.
- Middleware para habilitar CORS con `cors`.

## Requisitos funcionales

- La API sigue implementación REST y utiliza Node.js con Express.js como servidor.
- Se ha utilizado MongoDB como base de datos.
- Es necesario contar con Node.js y npm instalados para ejecutar el backend.
- Se ha implementado el manejo de errores y respuestas adecuadas para las solicitudes.

## Clonar y ejecutar el proyecto
Para obtener el proyecto backend, sigue estos pasos:

1. Clona el repositorio desde GitHub.
   
`git clone https://github.com/tomasild/groovelist-backend.git`

3. Accede al directorio del backend.

`cd groovelist-backend`

5. Instala las dependencias del backend.
   
`npm install`

7. Configura las variables de entorno. Crea un archivo `.env` en el directorio raíz del backend y configura las siguientes variables:
   
`MONGODB_URI=mongodb+srv://tu_usuario:tu_contraseña@glist.a6stnww.mongodb.net/?retryWrites=true&w=majority`

`PORT=3000`

Reemplaza `tu_usuario` y `tu_contraseña` con tus credenciales de acceso a la base de datos MongoDB. La variable `PORT` establece el puerto en el que se ejecutará el servidor, en este caso, se ha configurado para escuchar en el puerto 3000.

5. Ejecuta el servidor.
`npm run dev`

El servidor se iniciará y estará en funcionamiento en `http://localhost:3000` (o en el puerto que hayas configurado en `.env`).

## Enlace al repositorio del Frontend

[Enlace al repositorio glist-app-back](https://github.com/tomasild/glist-app-front/)

## Estructura del Backend

El backend sigue una estructura basada en modelos, controladores y rutas:

- `controllers`: Contiene los controladores que manejan la lógica de las solicitudes HTTP.
- `middlewares`: Incluye el middleware para el manejo de carga de archivos.
- `models`: Define los modelos de datos utilizando Mongoose para interactuar con la base de datos MongoDB.
- `routes`: Contiene las rutas de la API junto con los controladores asociados.
- `index.js`: Punto de entrada del servidor.

## Rutas de la API

A continuación se describen las principales rutas de la API junto con sus métodos y funciones:

### Rutas para canciones

- `GET /api/songs`: Obtiene todas las canciones con detalles del álbum asociado.
- `GET /api/songs/:id`: Obtiene una canción por su ID con detalles del álbum asociado.
- `GET /api/songs/album/:albumId`: Obtiene todas las canciones de un álbum específico por su ID.
- `GET /api/songs/:id/audio`: Obtiene el archivo de audio de una canción por su ID.
- `POST /api/songs`: Agrega una nueva canción a un álbum específico. Se debe proporcionar el título, duración y ID del álbum, además del archivo de música en el cuerpo de la solicitud.
- `DELETE /api/songs/:id`: Elimina una canción por su ID.

### Rutas para álbumes

- `GET /api/albums`: Obtiene todos los álbumes.
- `GET /api/albums/:id`: Obtiene un álbum por su ID.
- `POST /api/albums`: Agrega un nuevo álbum. Se debe proporcionar el título y el año del álbum en el cuerpo de la solicitud.
- `PUT /api/albums/:id`: Modifica un álbum existente por su ID. Se debe proporcionar el título y el año del álbum actualizado en el cuerpo de la solicitud.
- `DELETE /api/albums/:id`: Elimina un álbum por su ID.

## Observaciones 

- La API actualmente no está documentada con Swagger, lo cual sería una mejora para facilitar su uso y comprensión.
- En caso de clonar el proyecto, se recomienda continuar mejorando la implementación siguiendo las mejores prácticas, como agregar validaciones y asegurar la seguridad de la API.

## Créditos

Proyecto desarrollado como parte de una prueba técnica para Groovelist.

## Licencia

El proyecto se distribuye bajo la [Licencia MIT](https://opensource.org/licenses/MIT).

La Licencia MIT es una licencia de código abierto permisiva que permite a los desarrolladores utilizar, modificar, distribuir y sublicenciar el código del software, tanto con fines comerciales como no comerciales. Los usuarios pueden utilizar, modificar y distribuir el software bajo la Licencia MIT, siempre y cuando se incluya una copia del aviso de copyright y de la licencia en el código fuente y en cualquier copia distribuida.



