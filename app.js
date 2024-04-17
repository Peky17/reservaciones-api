const express = require("express");
const cors = require("cors");
// Importar routers
const authRouter = require("./routes/auth");
const museosRouter = require("./routes/museo");
// Routes for teatro
const teatrosRouter = require("./routes/teatro");
// Routes for cine
const cinesRouter = require("./routes/cine");
const connectDB = require("./db/config");
const swaggerUi = require("swagger-ui-express");
// Archivo JSON generado por swagger-autogen
const swaggerDocument = require("./configs/swagger_output.json");
// Módulo express
const app = express();
// Incluir archivo .env
require("dotenv").config();
// Conectar a la base de datos
connectDB.call();
// Middlewares
app.use(express.json());
app.use(cors());
app.use("/", express.static(__dirname + "/public"));
app.use("/auth", authRouter);
app.use("/museos", museosRouter);
app.use("/teatros", teatrosRouter);
app.use("/cines", cinesRouter);

// Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const server = app.listen(process.env.PORT, () => {
  console.log(`puerto:${process.env.PORT}`);
});

// Exporta server en lugar de app
module.exports = server;
