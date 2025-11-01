// openapi.js
export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Hunter x Hunter (SQL con Supabase)',
      version: '1.0.0',
      description: 'CRUD completo para personajes usando Supabase como base de datos relacional',
    },
    servers: [
      {
        url: 'http://localhost:10002/api',
      },
    ],
  },
  apis: ['./routes/*.js'],
};
