const express = require('express');
const router = express.Router();
const encargadosService = require('../services/encargadosService');
const service = new encargadosService();

router.get('/', async (req, res) => {
  const { id } = req.query;
  const encargados = id ? await service.getById(id) : await service.getAll();
  if (encargados) {
    res.status(200).json(encargados);
  } else {
    res.status(404).json({ message: 'No hay un encargado con ese ID' });
  }
});

router.post('/', async (req, res) => {
  const body = req.body;
  try {
    const newEncargado = await service.createEncargado(body);
    res.status(201).json({ message: 'Encargado creado', data: newEncargado });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch('/', async (req, res) => {
  const { id } = req.query;
  const body = req.body;

  if (!id) {
    return res.status(400).json({ message: 'El parámetro id es requerido.' });
  }

  try {
    const updatedEncargado = await service.updateEncargado(id, body);
    res.status(200).json({ message: 'Encargado actualizado', data: body });
  } catch (error) {
    if (error.message.includes('no existe')) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
});

router.delete('/', async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: 'El parámetro id es requerido.' });
  }

  try {
    await service.delete(id);
    res.status(200).json({ message: 'Encargado eliminado correctamente ' });
  } catch (error) {
    if (error.message.includes('no existe')) {
      res.status(404).json({ message: error.message });
    } else if (error.message.includes('esta asignado a un departamento')) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
});

/**
 * @swagger
 * tags:
 *   name: Encargados
 *   description: API para gestionar los encargados
 */

/**
 * @swagger
 * /encargados:
 *   get:
 *     summary: Obtener todos los encargados o un encargado por ID
 *     description: Obtiene todos los encargados o un encargado específico utilizando un ID
 *     tags: [Encargados]
 *     parameters:
 *       - name: id
 *         in: query
 *         description: ID del encargado (opcional)
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de encargados o un encargado específico
 *         content:
 *           application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: number
 *                nombre:
 *                  type: string
 *                estudio:
 *                  type: string
 *                turno:
 *                  type: string
 *       404:
 *         description: No se encontraron encargados
 */

/**
 * @swagger
 * /encargados:
 *   post:
 *     summary: Crear un nuevo encargado
 *     description: Crea un nuevo encargado con los datos proporcionados
 *     tags: [Encargados]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               estudio:
 *                 type: string
 *               turno:
 *                 type: string
 *     responses:
 *       201:
 *         description: Encargado creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito
 *                 data:
 *                   type: object
 *                   properties:
 *                     nombre:
 *                       type: string
 *                     estudio:
 *                       type: string
 *                     turno:
 *                       type: string
 *       400:
 *         description: Error en los datos proporcionados
 */

/**
 * @swagger
 * /encargados:
 *   patch:
 *     summary: Actualizar un encargado existente
 *     description: Actualiza un encargado según el ID proporcionado
 *     tags: [Encargados]
 *     parameters:
 *       - name: id
 *         in: query
 *         description: ID del encargado
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               estudio:
 *                 type: string
 *               turno:
 *                 type: string
 *     responses:
 *       200:
 *         description: Encargado actualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                     nombre:
 *                       type: string
 *                     estudio:
 *                       type: string
 *                     turno:
 *                       type: string
 *       400:
 *         description: Error en los datos proporcionados
 *       404:
 *         description: Encargado no encontrado
 */

/**
 * @swagger
 * /encargados:
 *   delete:
 *     summary: Eliminar un encargado
 *     description: Elimina un encargado específico utilizando su ID
 *     tags: [Encargados]
 *     parameters:
 *       - name: id
 *         in: query
 *         description: ID del encargado a eliminar
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Encargado eliminado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito
 *       400:
 *         description: Error en los datos proporcionados
 *       404:
 *         description: Encargado no encontrado
 *       500:
 *         description: Error interno del servidor
 */

module.exports = router;
