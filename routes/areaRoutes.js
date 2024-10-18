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

router.post('/', (req, res) => {
  const body = req.body;
  try {
    service.create(body);
    res.status(200).json({ message: 'Area creada', data: body });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch('/', (req, res) => {
  const { id } = req.query;
  const datosActualizados = req.body;

  if (!id) {
    return res.status(400).json({ message: 'El parámetro id es requerido.' });
  }

  try {
    const areaActualizada = service.update(id, datosActualizados);
    res
      .status(200)
      .json({ message: 'Área actualizada', data: areaActualizada });
  } catch (error) {
    if (error.message.includes('no existe')) {
      res.status(404).json({ message: error.message });
    } else if (error.message.includes('campo Nombre no puede estar vacío')) {
      res.status(400).json({ message: error.message });
    } else {
      res
        .status(500)
        .json({ message: 'Error interno del servidor', error: error.message });
    }
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
