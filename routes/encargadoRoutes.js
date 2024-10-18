const express = require('express');
const router = express.Router();
const encargadosService = require('../services/encargadosService');
const service = new encargadosService();

router.get('/', (req, res) => {
  const { id } = req.query;
  const encargados = id ? service.getById(id) : service.getAll();
  if (encargados) {
    res.status(200).json(encargados);
  } else {
    res.status(404).json({ message: 'No hay un encargado con ese ID' });
  }
});

router.delete('/', (req, res) => {
  const { id } = req.query;
  try {
    service.delete(id);
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

module.exports = router;
