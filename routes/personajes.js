import express from "express";
import {
  getPersonajes,
  getPersonajeById,
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
 *   description: API para gestionar personajes de Hunter x Hunter
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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Personaje'
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
 *         description: Personaje encontrado
 *       404:
 *         description: Personaje no encontrado
 */
router.get("/id/:id", getPersonajeById);

/**
 * @swagger
 * /api/personajes/nombre/{nombre}:
 *   get:
 *     summary: Obtener un personaje por nombre (búsqueda parcial)
 *     tags: [Personajes]
 *     parameters:
 *       - in: path
 *         name: nombre
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre o parte del nombre
 *     responses:
 *       200:
 *         description: Personajes encontrados
 *       404:
 *         description: No se encontraron personajes
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
 */
router.post("/", createPersonaje);

/**
 * @swagger
 * /api/personajes/{id}:
 *   put:
 *     summary: Actualizar un personaje existente
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
 */
router.put("/:id", updatePersonaje);

/**
 * @swagger
 * /api/personajes/{id}:
 *   delete:
 *     summary: Eliminar un personaje
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
