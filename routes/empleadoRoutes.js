const express = require('express');
const router = express.Router();
const empleados = [];
const empleadosService = require('../services/empleadoService');
const service = new empleadosService();

router.get('/', (req, res) => {
  const { id } = req.query;

  const empleados = id ? service.getById(id) : service.getAll();
  if (empleados) {
    res.status(200).json(empleados);
  } else {
    res.status(404).json({ message: 'No hay un empleado con ese ID' });
  }
});

router.post('/', (req, res) => {
  const nuevoEmpleado = req.body;
  try {
    const createEmpleado = service.agregarEmpleado(nuevoEmpleado);
    res.status(201).json({ message: 'Empleado creado ', data: createEmpleado });
  } catch (error) {
    if (error.message.includes('no existe')) {
      res.status(404).json({ message: error.message });
    } else if (error.message.includes('Algo salio')) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
});

router.patch('/', (req, res) => {
  const { id } = req.query;
  const datosActualizados = req.body;
  try {
    const empleadoActualizado = service.modificarEmpleado(
      id,
      datosActualizados,
    );
    res
      .status(200)
      .json({ message: 'Empleado actualizado', data: empleadoActualizado });
  } catch (error) {
    if (error.message.includes('no existe')) {
      res.status(404).json({ message: error.message });
    } else if (error.message.includes('cuerpo correcto')) {
      res.status(400).json({ message: error.message });
    } else {
      res
        .status(500)
        .json({ message: 'Error interno del servidor', error: error.message });
    }
  }
});

router.delete('/', (req, res) => {
  const { id } = req.query;
  const eliminar = service.delete(id);
  if (eliminar !== -1) {
    res.status(200).json({ message: 'Se ha eliminado correctamente' });
  } else {
    res
      .status(404)
      .json({ message: 'El empleado que intetas eliminar no existe' });
  }
});

/**
 * @swagger
 * tags:
 *   name: Empleados
 *   description: API para gestionar los empleados
 */

/**
 * @swagger
 * /empleados:
 *   get:
 *     summary: Obtener todos los empleados o un empleado por ID
 *     description: Obtiene todos los empleados o un empleado específico utilizando un ID
 *     tags: [Empleados]
 *     parameters:
 *       - name: id
 *         in: query
 *         description: ID del empleado (opcional)
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de empleados o un empleado específico
 *         content:
 *           application/json:
 *            schema:
 *              type: object
 *              properties:
 *                nombre:
 *                  type: string
 *                apellido:
 *                  type: string
 *                edad:
 *                  type: number
 *                genero:
 *                  type: string
 *                departamento_1:
 *                  type: object
 *                  properties:
 *                    nombre:
 *                      type: string
 *                    clave:
 *                      type: number
 *                departamento_2:
 *                  type: object
 *                  properties:
 *                    nombre:
 *                      type: string
 *                    clave:
 *                      type: number
 *                departamento_3:
 *                  type: object
 *                  properties:
 *                    nombre:
 *                      type: string
 *                    clave:
 *                      type: number
 *       404:
 *         description: No se encontraron empleados
 */

/**
 * @swagger
 * /empleados:
 *   post:
 *     summary: Crear un nuevo empleado
 *     description: Crea un nuevo empleado con los datos proporcionados
 *     tags: [Empleados]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               apellido:
 *                 type: string
 *               edad:
 *                 type: number
 *               genero:
 *                 type: string
 *               departamento_1:
 *                 type: object
 *                 properties:
 *                   nombre:
 *                     type: string
 *                   clave:
 *                     type: number
 *               departamento_2:
 *                 type: object
 *                 properties:
 *                   nombre:
 *                     type: string
 *                   clave:
 *                     type: number
 *               departamento_3:
 *                 type: object
 *                 properties:
 *                   nombre:
 *                     type: string
 *                   clave:
 *                     type: number
 *     responses:
 *       201:
 *         description: Empleado creado exitosamente
 *         content:
 *           application/json:
 *            schema:
 *              type: object
 *              properties:
 *                nombre:
 *                  type: string
 *                apellido:
 *                  type: string
 *                edad:
 *                  type: number
 *                genero:
 *                  type: string
 *                departamento_1:
 *                  type: object
 *                  properties:
 *                    nombre:
 *                      type: string
 *                    clave:
 *                      type: number
 *                departamento_2:
 *                  type: object
 *                  properties:
 *                    nombre:
 *                      type: string
 *                    clave:
 *                      type: number
 *                departamento_3:
 *                  type: object
 *                  properties:
 *                    nombre:
 *                      type: string
 *                    clave:
 *                      type: number
 *       400:
 *         description: Error en los datos proporcionados
 *       404:
 *         description: No se encontró el departamento especificado
 */

/**
 * @swagger
 * /empleados:
 *   patch:
 *     summary: Actualizar un empleado existente
 *     description: Actualiza un empleado según el ID proporcionado
 *     tags: [Empleados]
 *     parameters:
 *       - name: id
 *         in: query
 *         description: ID del empleado
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
 *               apellido:
 *                 type: string
 *               edad:
 *                 type: number
 *               genero:
 *                 type: string
 *               departamento_1:
 *                 type: object
 *                 properties:
 *                   nombre:
 *                     type: string
 *                   clave:
 *                     type: number
 *               departamento_2:
 *                 type: object
 *                 properties:
 *                   nombre:
 *                     type: string
 *                   clave:
 *                     type: number
 *               departamento_3:
 *                 type: object
 *                 properties:
 *                   nombre:
 *                     type: string
 *                   clave:
 *                     type: number
 *     responses:
 *       200:
 *         description: Empleado actualizado
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
 *                     apellido:
 *                       type: string
 *                     edad:
 *                       type: number
 *                     genero:
 *                       type: string
 *                     departamento_1:
 *                       type: object
 *                       properties:
 *                         nombre:
 *                           type: string
 *                         clave:
 *                           type: number
 *                     departamento_2:
 *                       type: object
 *                       properties:
 *                         nombre:
 *                           type: string
 *                         clave:
 *                           type: number
 *                     departamento_3:
 *                       type: object
 *                       properties:
 *                         nombre:
 *                           type: string
 *                         clave:
 *                           type: number
 *       400:
 *         description: Error en los datos proporcionados
 *       404:
 *         description: Empleado no encontrado
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /empleados:
 *   delete:
 *     summary: Eliminar un empleado
 *     description: Elimina un empleado específico utilizando su ID
 *     tags: [Empleados]
 *     parameters:
 *       - name: id
 *         in: query
 *         description: ID del empleado a eliminar
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Empleado eliminado
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
 *         description: Empleado no encontrado
 *       500:
 *         description: Error interno del servidor
 */

module.exports = router;
