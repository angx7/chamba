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

module.exports = router;
