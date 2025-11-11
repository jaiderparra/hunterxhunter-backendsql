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

router.get("/", getPersonajes);

/**
 * @swagger
 * /api/personajes/id/{id}:
 *   get:
 *     summary: Obtener un personaje por ID
 *     tags: [Personajes]
 */
router.get("/id/:id", getPersonajeById);

/**
 * @swagger
 * /api/personajes/nombre/{nombre}:
 *   get:
 *     summary: Obtener personaje por nombre
 *     tags: [Personajes]
 */
router.get("/nombre/:nombre", getPersonajeByNombre);

/**
 * @swagger
 * /api/personajes:
 *   post:
 *     summary: Crear personaje
 *     tags: [Personajes]
 */
router.post("/", createPersonaje);

/**
 * @swagger
 * /api/personajes/{id}:
 *   put:
 *     summary: Actualizar personaje
 *     tags: [Personajes]
 */
router.put("/:id", updatePersonaje);

/**
 * @swagger
 * /api/personajes/{id}:
 *   delete:
 *     summary: Eliminar personaje
 *     tags: [Personajes]
 */
router.delete("/:id", deletePersonaje);

export default router;
