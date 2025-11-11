const express = require("express");
const cors = require("cors");
const personajesRoutes = require("./routes/personajes.js");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
app.use(express.json());
app.use(cors());

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Hunter x Hunter API",
      version: "1.0.0",
      description: "API REST con Supabase y Swagger",
    },
    servers: [
      { url: "https://hunterxhunter-backendsql.onrender.com" },
      { url: "http://localhost:10002" }
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rutas
app.use("/api/personajes", personajesRoutes);

const PORT = process.env.PORT || 10002;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`✅ Servidor SQL en puerto ${PORT}`));
}

module.exports = app;
