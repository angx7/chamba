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
    service.agregarEmpleado(nuevoEmpleado);
  } catch (error) {}
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
