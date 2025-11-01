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
 * /api/personajes/{nombre}:
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Personaje'
 *       404:
 *         description: Personaje no encontrado
 */
router.get("/:nombre", getPersonajeByNombre);

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
 *         description: ID del personaje a actualizar
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
 *         description: ID del personaje a eliminar
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
 *           example: 1
 *         nombre:
 *           type: string
 *           example: Hisoka
 *         edad:
 *           type: integer
 *           example: 28
 *         altura:
 *           type: integer
 *           example: 186
 *         peso:
 *           type: integer
 *           example: 80
 *         imagen:
 *           type: string
 *           example: "https://static.wikia.nocookie.net/hunterx..."
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
 *           example: Gon Freecss
 *         edad:
 *           type: integer
 *           example: 12
 *         altura:
 *           type: integer
 *           example: 154
 *         peso:
 *           type: integer
 *           example: 49
 *         imagen:
 *           type: string
 *           example: "https://static.wikia.nocookie.net/hunterx..."
 */

export default router;
