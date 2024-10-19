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
      datosActualizados
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

module.exports = router;
