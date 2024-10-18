const express = require('express');
const router = express.Router();
const areasService = require('../services/areaService');
const service = new areasService();

router.get('/', (req, res) => {
  const { id } = req.query;
  const areas = id ? service.getById(id) : service.getAll();
  res.json(areas);
});
module.exports = router;
