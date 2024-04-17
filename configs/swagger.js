const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger_output.json";
const endpointsFiles = ["../app.js"]; // Ruta al archivo principal de tu aplicación Express.js

const doc = {
  info: {
    title: "API de Ticketmaster", // Nombre de tu API
    version: "1.0.0", // Versión de tu API
    description: "Una API simple para solucionar el problema de Ticketmaster", // Descripción de tu API
  },
  host: "localhost:2450", // Cambia 'puerto' al número de puerto de tu aplicación
  basePath: "/", // Ruta base de tu API
  schemes: ["http"], // Protocolos de tu API (http, https, etc.)
  consumes: ["application/json"], // Tipos de contenido que acepta tu API
  produces: ["application/json"], // Tipos de contenido que produce tu API
  tags: [
    {
      name: "default",
      description: "Todas las operaciones", // Descripción de la etiqueta
    },
  ],
  definitions: {}, // Define esquemas de datos utilizados en tu API
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("../app.js"); // Importa tu aplicación Express.js después de que la documentación se haya generado
});
