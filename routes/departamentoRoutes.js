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

module.exports = router;
