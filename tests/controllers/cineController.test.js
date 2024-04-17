const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const request = require("supertest");
const app = require("../../app"); // Importar archivo principal de la aplicación Express.js
const Cine = require("../../models/cine/cine");

let mongoServer;
let token;

beforeAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Registrar un usuario de prueba
  const registerResponse = await request(app)
    .post("/auth/registrar")
    .send({ email: "kike@gmail.com", password: "peky20011", username: "test" });
  console.log(registerResponse.body); // Debería contener algún tipo de confirmación

  // Autenticar al usuario de prueba y obtener el token JWT
  const res = await request(app).post("/auth/login").send({
    email: "kike@gmail.com",
    password: "peky20011",
  });
  console.log(res.body);
  token = res.body.token;
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Cine Controller", () => {
  beforeEach(async () => {
    await Cine.deleteMany(); // Limpia la colección de cines antes de cada prueba
  });

  test("Crear cine", async () => {
    // Crea una prueba para la función createCine
    const response = await request(app)
      .post("/cines/createCine")
      .set("x-auth-token", token)
      .send({ nombre: "Nombre del cine", horario: "Horario del cine" })
      .expect(200);

    expect(response.body.ok).toBe(true);
    expect(response.body.msg).toBe("Cine creado");
    expect(response.body.cine).toBeDefined();
  });

  test("Listar cines", async () => {
    // Crea una prueba para la función listarCines
    const response = await request(app)
      .get("/cines/getAllCines")
      .set("x-auth-token", token)
      .expect(200);

    expect(response.body.ok).toBe(true);
    expect(response.body.cines).toBeDefined();
  });

  // Crea pruebas similares para las demás funciones del controlador
});
