const express = require('express');
const router = express.Router();
const encargadosService = require('../services/encargadosService');
const service = new encargadosService();

router.get('/', (req, res) => {
  const { id } = req.query;
  const encargados = id ? service.getById(id) : service.getAll();
  res.json(encargados);
});

module.exports = router;
