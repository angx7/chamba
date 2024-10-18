const express = require('express');
const router = express.Router();
const areasService = require('../services/areaService');
const service = new areasService();

router.get('/', (req, res) => {
  const { id } = req.query;
  const areas = id ? service.getById(id) : service.getAll();
  if (areas) {
    res.status(200).json(areas);
  } else {
    res.status(404).json({ message: 'Error ' });
  }
});
module.exports = router;
