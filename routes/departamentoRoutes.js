const express = require('express');
const router = express.Router();
const departamentosService = require('../services/departamentoService');
const service = new departamentosService();

router.get('/', (req, res) => {
  const { id } = req.query;
  const departamentos = id ? service.getById(id) : service.getAll();
  res.json(departamentos);
});

module.exports = router;
