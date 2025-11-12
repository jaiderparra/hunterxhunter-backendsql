// server.js (ESM)
import express from "express";
import cors from "cors";
import personajesRoutes from "./routes/personajes.js";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();
app.use(express.json());
app.use(cors());

// 📘 Configuración Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Hunter x Hunter API - SQL",
      version: "1.0.0",
      description: "API REST con Supabase y Swagger para Personajes SQL",
    },
    servers: [
      { url: "https://hunterxhunter-backendsql.onrender.com" },
      { url: "http://localhost:10002" }
    ],
  },
  apis: ["./routes/*.js"], // Aquí Swagger buscará el JSDoc
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// 📦 Rutas de personajes
app.use("/api/personajes", personajesRoutes);

// ✅ Exportar para Jest y Render
export default app;

// ▶️ Ejecutar solo si no estamos en test (esto evita error doble puerto)
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 10002;
  app.listen(PORT, () => console.log(`✅ Servidor SQL corriendo en http://localhost:${PORT}`));
}
