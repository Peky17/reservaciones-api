const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION);
    console.log("Conectado a mongo");
  } catch (error) {
    console.log("No fue posible conectar a mongodb: " + error);
  }
};
module.exports = connectDB;
