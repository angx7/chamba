const { encargados } = require('../models/encargado');
const mongoose = require('mongoose');
const customError = require('../utils/customError');

class encargadosService {
  async getAll() {
    return await encargados.find();
  }

  async getById(id) {
    if (mongoose.Types.ObjectId.isValid(id)) {
      return await encargados.findOne({ _id: id });
    }
    throw new customError('El ID proporcionado no existe', 404);
  }

  async createEncargado(nuevoEncargado) {
    if (
      !nuevoEncargado.nombre ||
      !nuevoEncargado.estudio ||
      !nuevoEncargado.turno
    ) {
      throw new customError(
        'El cuerpo del nuevo encargado no está completo',
        400,
      );
    }

    const encargado = new encargados({
      nombre: nuevoEncargado.nombre,
      estudio: nuevoEncargado.estudio,
      turno: nuevoEncargado.turno,
    });

    await encargado.save();
    return encargado;
  }

  async updateEncargado(id, updatedFields) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new customError('El ID proporcionado no existe', 404);
    }

    const encargado = await this.getById(id);

    if (!encargado) {
      throw new customError(`El encargado con ID ${id} no existe`, 404);
    }

    const { nombre, estudio, turno } = updatedFields;

    if (nombre === undefined && estudio === undefined && turno === undefined) {
      throw new customError('No se proporcionaron campos para actualizar', 400);
    }

    if (nombre !== undefined && nombre.trim() === '') {
      throw new customError('El campo nombre no puede estar vacío', 400);
    }
    if (estudio !== undefined && estudio.trim() === '') {
      throw new customError('El campo estudio no puede estar vacío', 400);
    }
    if (turno !== undefined && turno.trim() === '') {
      throw new customError('El campo turno no puede estar vacío', 400);
    }

    if (nombre !== undefined) {
      encargado.nombre = nombre;
    }
    if (estudio !== undefined) {
      encargado.estudio = estudio;
    }
    if (turno !== undefined) {
      encargado.turno = turno;
    }

    await encargado.save();
    return encargado;
  }

  async delete(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new customError('El ID proporcionado no existe', 404);
    }

    const encargado = await this.getById(id);
    if (!encargado) {
      throw new customError(`El encargado con ID ${id} no existe`, 404);
    }

    const { departamentos } = require('../models/departamento');
    const encargadoAsignado = await departamentos.findOne({
      encargado: id,
    });

    if (encargadoAsignado) {
      throw new customError(
        'No se puede eliminar a este encargado porque está asignado a un departamento',
        400,
      );
    }

    await encargados.deleteOne({ _id: id });
    return { id };
  }
}
module.exports = encargadosService;
