const express = require('express');
const router = express.Router();
const areasService = require('../services/areaService');
const service = new areasService();

router.get('/', async (req, res) => {
  const { id } = req.query;
  try {
    const areas = id ? await service.getById(id) : await service.getAll();
    if (areas) {
      res.status(200).json(areas);
    } else {
      res.status(404).json({ message: 'No se encontraron áreas ' });
    }
  } catch (error) {
    res.status(505).json({ message: 'Erorr en el servidor ' });
  }
});

router.post('/', async (req, res) => {
  const body = req.body;
  try {
    const newArea = await service.create(body);
    res.status(200).json({ message: 'Area creada', data: newArea });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch('/', async (req, res) => {
  const { id } = req.query;
  const datosActualizados = req.body;

  if (!id) {
    return res.status(400).json({ message: 'El parámetro id es requerido.' });
  }

  try {
    const areaActualizada = await service.update(id, datosActualizados);
    res
      .status(200)
      .json({ message: 'Área actualizada', data: areaActualizada });
  } catch (error) {
    if (error.message.includes('no existe')) {
      res.status(404).json({ message: 'No se encontro el área' });
    } else if (error.message.includes('campo nombre no puede estar vacío')) {
      res.status(400).json({ message: error.message });
    } else if (error.message.includes('ya tiene un área asignada')) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error interno del servidor' });
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
    res.status(200).json({ message: 'El área fue eliminada correctamente ' });
  } catch (error) {
    if (error.message.includes('no existe')) {
      res.status(404).json({ message: error.message });
    } else if (error.message.includes('hay departamentos en ella')) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
}); //hay departamentos en ella

/**
 * @swagger
 * tags:
 *   name: Areas
 *   description: API para gestionar las Areas
 */

/**
 * @swagger
 * /areas:
 *   get:
 *     summary: Obtener todas las Areas o una área por ID
 *     description: Obtiene todas las Areas o una área específica utilizando un ID
 *     tags: [Areas]
 *     parameters:
 *       - name: id
 *         in: query
 *         description: ID de la área (opcional)
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de Areas o un área específica
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID de la área
 *                 nombre:
 *                   type: string
 *                 edificio:
 *                   type: number
 *       404:
 *         description: No se encontraron Areas
 */

/**
 * @swagger
 * /areas:
 *   post:
 *     summary: Crear una nueva área
 *     description: Crea una nueva área con los datos proporcionados
 *     tags: [Areas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               edificio:
 *                 type: number
 *     responses:
 *       200:
 *         description: Área creada exitosamente
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
 *                       description: Nombre de la área creada
 *       400:
 *         description: Error al crear el área
 */

/**
 * @swagger
 * /areas:
 *   patch:
 *     summary: Actualizar una área existente
 *     description: Actualiza una área según el ID proporcionado
 *     tags: [Areas]
 *     parameters:
 *       - name: id
 *         in: query
 *         description: ID de la área
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
 *               edificio:
 *                 type: number
 *     responses:
 *       200:
 *         description: Área actualizada
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
 *                     edificio:
 *                       type: number
 *       400:
 *         description: Error en los datos proporcionados
 *       404:
 *         description: Área no encontrada
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /areas:
 *   delete:
 *     summary: Eliminar una área
 *     description: Elimina una área específica utilizando su ID
 *     tags: [Areas]
 *     parameters:
 *       - name: id
 *         in: query
 *         description: ID de la área a eliminar
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Área eliminada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito
 *       400:
 *         description: Error al eliminar el área
 *       404:
 *         description: Área no encontrada
 *       500:
 *         description: Error interno del servidor
 */

module.exports = router;
