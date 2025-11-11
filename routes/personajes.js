import express from "express";
import {
  getPersonajes,
  getPersonajeByNombre,
  createPersonaje,
  updatePersonaje,
  deletePersonaje
} from "../controller/personajes.controller.js";

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
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del personaje
 *     responses:
 *       200:
 *         description: Personaje encontrado correctamente
 *       404:
 *         description: Personaje no encontrado
 */
router.get("/id/:id", async (req, res) => {
  const { id } = req.params;
  const { supabase } = req.app.locals;

  try {
    const { data, error } = await supabase
      .from("personajes")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) return res.status(404).json({ mensaje: "Personaje no encontrado" });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/personajes/nombre/{nombre}:
 *   get:
 *     summary: Obtener un personaje por su nombre
 *     tags: [Personajes]
 *     parameters:
 *       - in: path
 *         name: nombre
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre del personaje
 *     responses:
 *       200:
 *         description: Personaje encontrado
 *       404:
 *         description: Personaje no encontrado
 */
router.get("/nombre/:nombre", getPersonajeByNombre);

/**
 * @swagger
 * /api/personajes:
 *   post:
 *     summary: Crear un nuevo personaje
 *     tags: [Personajes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PersonajeInput'
 *     responses:
 *       201:
 *         description: Personaje creado correctamente
 *       400:
 *         description: Error en la solicitud
 */
router.post("/", createPersonaje);

/**
 * @swagger
 * /api/personajes/{id}:
 *   put:
 *     summary: Actualizar un personaje por ID
 *     tags: [Personajes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PersonajeInput'
 *     responses:
 *       200:
 *         description: Personaje actualizado correctamente
 *       404:
 *         description: Personaje no encontrado
 */
router.put("/:id", updatePersonaje);

/**
 * @swagger
 * /api/personajes/{id}:
 *   delete:
 *     summary: Eliminar un personaje por ID
 *     tags: [Personajes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Personaje eliminado correctamente
 *       404:
 *         description: Personaje no encontrado
 */
router.delete("/:id", deletePersonaje);

/**
 * @swagger
 * components:
 *   schemas:
 *     Personaje:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         nombre:
 *           type: string
 *         edad:
 *           type: integer
 *         altura:
 *           type: integer
 *         peso:
 *           type: integer
 *         imagen:
 *           type: string
 *
 *     PersonajeInput:
 *       type: object
 *       required:
 *         - nombre
 *         - edad
 *         - altura
 *         - peso
 *         - imagen
 *       properties:
 *         nombre:
 *           type: string
 *         edad:
 *           type: integer
 *         altura:
 *           type: integer
 *         peso:
 *           type: integer
 *         imagen:
 *           type: string
 */

export default router;
