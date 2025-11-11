// server.js
import express from "express";
import cors from "cors";
import personajesRoutes from "./routes/personajes.js";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { supabase } from "./db.js";

app.locals.supabase = supabase;
const app = express();
app.use(express.json());
app.use(cors());

// 📘 Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Hunter x Hunter API",
      version: "1.0.0",
      description: "API REST con Supabase y Swagger para personajes de Hunter x Hunter",
    },
    servers: [
        {
            url: "https://hunterxhunter-backendsql.onrender.com",
            description: "Servidor en Railway",
        },
        {
            url: "http://localhost:10002",
            description: "Servidor local para desarrollo",
        },
    ],
  },
  apis: ["./routes/*.js"], // 👈 Rutas donde Swagger busca las anotaciones
};

// 🧩 Rutas principales
app.use("/api/personajes", personajesRoutes);

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// 🟢 Iniciar servidor
const PORT = process.env.PORT || 10002;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📘 Documentación Swagger en http://localhost:${PORT}/api`);
});

// Exportamos app para Jest
export default app;

// Solo iniciar si no es test
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 10002;
  app.listen(PORT, () => console.log(`Servidor SQL en puerto ${PORT}`));
}