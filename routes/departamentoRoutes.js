const express = require('express');
const router = express.Router();
const departamentosService = require('../services/departamentoService');
const service = new departamentosService();

router.get('/', (req, res) => {
  const { id } = req.query;
  const departamentos = id ? service.getById(id) : service.getAll();
  if (departamentos) {
    res.status(200).json(departamentos);
  } else {
    res.status(404).json({ message: 'No hay un departamentos con ese ID' });
  }
});

router.post('/', (req, res) => {
  const newDepto = req.body;
  try {
    const nuevo = service.createDepto(newDepto);
    res.status(201).json({ message: 'Departamento creado', data: nuevo });
  } catch (error) {
    if (error.message.includes('no existe')) {
      res.status(404).json({ message: error.message });
    } else if (error.message.includes('incompleto')) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
});

router.patch('/', (req, res) => {
  const { id } = req.query;
  const body = req.body;
  try {
    service.modificarDepto(id, body);
    res.status(200).json({ message: 'Departamento actualizado', data: body });
  } catch (error) {
    if (error.message.includes('no existe')) {
      res.status(404).json({ message: error.message });
    } else if (error.message.includes('incompleto')) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
});

router.delete('/', (req, res) => {
  const { id } = req.query;
  try {
    service.delete(parseInt(id, 10));
    res.status(200).json({ message: 'Departamento eliminado exitosamente' });
  } catch (error) {
    if (error.message.includes('no existe')) {
      res.status(404).json({ message: error.message });
    } else if (error.message.includes('hay empleados asignados')) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
});

/**
 * @swagger
 * tags:
 *   name: Departamentos
 *   description: API para gestionar los departamentos
 */

/**
 * @swagger
 * /departamentos:
 *   get:
 *     summary: Obtener todos los departamentos o un departamento por ID
 *     description: Obtiene todos los departamentos o un departamento específico utilizando un ID
 *     tags: [Departamentos]
 *     parameters:
 *       - name: id
 *         in: query
 *         description: ID del departamento (opcional)
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de departamentos o un departamento específico
 *         content:
 *           application/json:
 *            schema:
 *              type: object
 *              properties:
 *                nombre:
 *                  type: string
 *                encargado:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: number
 *                    nombre:
 *                      type: string
 *                    estudio:
 *                      type: string
 *                    turno:
 *                      type: string
 *                area:
 *                  type: object
 *                  properties:
 *                    nombre:
 *                      type: string
 *                    clave:
 *                      type: number
 *       404:
 *         description: No se encontraron departamentos
 */

/**
 * @swagger
 * /departamentos:
 *   post:
 *     summary: Crear un nuevo departamento
 *     description: Crea un nuevo departamento con los datos proporcionados
 *     tags: [Departamentos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               encargado:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   nombre:
 *                     type: string
 *                   estudio:
 *                     type: string
 *                   turno:
 *                     type: string
 *               area:
 *                 type: object
 *                 properties:
 *                   nombre:
 *                     type: string
 *                   clave:
 *                     type: number
 *     responses:
 *       201:
 *         description: Departamento creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre:
 *                   type: string
 *                 encargado:
 *                   type: object
 *                   properties:
 *                     nombre:
 *                       type: string
 *                     encargado:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: number
 *                         nombre:
 *                           type: string
 *                         estudio:
 *                           type: string
 *                         turno:
 *                           type: string
 *                     area:
 *                       type: object
 *                       properties:
 *                         nombre:
 *                           type: string
 *                         clave:
 *                           type: number
 *       400:
 *         description: Error en los datos proporcionados
 *       404:
 *         description: No se encontró el área o el encargado especificado
 */

/**
 * @swagger
 * /departamentos:
 *   patch:
 *     summary: Actualizar un departamento existente
 *     description: Actualiza un departamento según el ID proporcionado
 *     tags: [Departamentos]
 *     parameters:
 *       - name: id
 *         in: query
 *         description: ID del departamento
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
 *               encargado:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   nombre:
 *                     type: string
 *                   estudio:
 *                     type: string
 *                   turno:
 *                     type: string
 *               area:
 *                 type: object
 *                 properties:
 *                   nombre:
 *                     type: string
 *                   clave:
 *                     type: number
 *     responses:
 *       200:
 *         description: Departamento actualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     nombre:
 *                       type: string
 *                     encargado:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: number
 *                         nombre:
 *                           type: string
 *                         estudio:
 *                           type: string
 *                         turno:
 *                           type: string
 *                     area:
 *                       type: object
 *                       properties:
 *                         nombre:
 *                           type: string
 *                         clave:
 *                           type: number
 *       400:
 *         description: Error en los datos proporcionados
 *       404:
 *         description: Departamento no encontrado
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /departamentos:
 *   delete:
 *     summary: Eliminar un departamento
 *     description: Elimina un departamento específico utilizando su ID
 *     tags: [Departamentos]
 *     parameters:
 *       - name: id
 *         in: query
 *         description: ID del departamento a eliminar
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Departamento eliminado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Error en los datos proporcionados
 *       404:
 *         description: Departamento no encontrado
 *       500:
 *         description: Error interno del servidor
 */

module.exports = router;
