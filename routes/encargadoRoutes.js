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
  service.delete(id);
});

module.exports = router;
