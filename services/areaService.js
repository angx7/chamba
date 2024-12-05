const { areas } = require('../models/area');
const mongoose = require('mongoose');
const customError = require('../utils/customError');

class areasService {
  async getAll() {
    return await areas.find();
  }

  async getById(id) {
    if (mongoose.Types.ObjectId.isValid(id)) {
      return await areas.findOne({ _id: id });
    }
    throw new customError('El id del area no existe', 404);
  }

  async create(body) {
    const { nombre, edificio } = body;

    if (!nombre || !edificio) {
      throw new customError('El cuerpo de la petición no esta completa', 400);
    }

    const areaExistente = await areas.findOne({ edificio: edificio });

    if (areaExistente) {
      throw new customError('El edificio ya tiene un área asignada', 400);
    }

    const newArea = new areas({
      nombre: nombre,
      edificio: edificio,
    });

    await newArea.save();
    return newArea;
  }

  async update(id, body) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new customError('El id del area no existe', 404);
    }
    const area = await this.getById(id);

    if (!area) {
      throw new customError('El id del area no existe', 404);
    }

    const { nombre, edificio } = body;

    const areaExistente = await areas.findOne({ edificio: edificio });

    if (areaExistente && areaExistente._id != id) {
      throw new customError('El edificio ya tiene un área asignada', 400);
    }

    if (nombre !== undefined) {
      if (nombre.trim() === '') {
        throw new customError('El campo nombre no puede estar vacío.', 400);
      }
      area.nombre = nombre;
    }

    if (edificio !== undefined) {
      if (typeof edificio !== 'number' || isNaN(edificio)) {
        throw new customError(
          'El campo edificio debe ser un número válido.',
          400,
        );
      }
      area.edificio = edificio;
    }

    await area.save();
    return area;
  }

  async delete(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new customError('El id del area no existe', 404);
    }

    const area = await this.getById(id);

    if (!area) {
      throw new customError('El id del area no existe', 404);
    }

    const { departamentos } = require('../models/departamento');
    const areaAsignada = await departamentos.findOne({ area: id });

    if (areaAsignada) {
      throw new customError(
        'No se puede eliminar esta área porque hay departamentos en ella',
        400,
      );
    }

    await areas.deleteOne({ _id: id });
    return { id };
  }
}
module.exports = areasService;
