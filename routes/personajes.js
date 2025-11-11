const express = require("express");
const {
  getPersonajes,
  getPersonajeByNombre,
  createPersonaje,
  updatePersonaje,
  deletePersonaje
} = require("../controller/personajes.controller.js");
const { supabase } = require("../db.js");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Personajes
 *   description: API para gestionar personajes de Hunter x Hunter (SQL Supabase)
 */

/**
 * @swagger
 * /api/personajes:
 *   get:
 *     summary: Obtener todos los personajes
 *     tags: [Personajes]
 *     responses:
 *       200:
 *         description: Lista de personajes obtenida correctamente
 */
router.get("/", getPersonajes);

/**
 * @swagger
 * /api/personajes/id/{id}:
 *   get:
 *     summary: Obtener un personaje por ID
 *     tags: [Personajes]
 */
router.get("/id/:id", async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("personajes")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return res.status(404).json({ mensaje: "Personaje no encontrado" });

  res.json(data);
});

/**
 * @swagger
 * /api/personajes/nombre/{nombre}:
 *   get:
 *     summary: Obtener un personaje por su nombre
 *     tags: [Personajes]
 */
router.get("/nombre/:nombre", getPersonajeByNombre);

/**
 * @swagger
 * /api/personajes:
 *   post:
 *     summary: Crear un nuevo personaje
 *     tags: [Personajes]
 */
router.post("/", createPersonaje);

/**
 * @swagger
 * /api/personajes/{id}:
 *   put:
 *     summary: Actualizar un personaje por ID
 *     tags: [Personajes]
 */
router.put("/:id", updatePersonaje);

/**
 * @swagger
 * /api/personajes/{id}:
 *   delete:
 *     summary: Eliminar un personaje por ID
 *     tags: [Personajes]
 */
router.delete("/:id", deletePersonaje);

module.exports = router;
