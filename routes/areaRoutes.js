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

router.delete('/', (req, res) => {
  const { id } = req.query;
  try {
    service.delete(id);
    res.status(200).json({ message: 'El área fue eliminada correctamente ' });
  } catch (error) {
    if (error.message.includes('no existe')) {
      res.status(404).json({ message: error.message });
    } else if (error.message.includes('hay departamentos en ella')) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
}); //hay departamentos en ella

module.exports = router;
