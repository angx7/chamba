const { departamentos } = require('../models/departamento');
const { encargados } = require('../models/encargado');
const { areas } = require('../models/area');
const mongoose = require('mongoose');
const customError = require('../utils/customError');

class departamentosService {
  async getAll() {
    return await departamentos.find().populate('encargado area');
  }

  async getById(id) {
    if (mongoose.Types.ObjectId.isValid(id)) {
      return await departamentos
        .findOne({ _id: id })
        .populate('encargado area');
    }
    throw new customError('El ID del departamento no existe.', 404);
  }

  async createDepto(newDepto) {
    // Validar que el cuerpo esté completo
    if (!newDepto.nombre || !newDepto.encargado || !newDepto.area) {
      throw new customError(
        'El cuerpo del nuevo departamento está incompleto.',
        400,
      );
    }
    // Validar que el encargado tenga el cuerpo correcto
    const encargado = newDepto.encargado;
    if (!encargado.id || !encargado.nombre) {
      throw new customError('El cuerpo del encargado está incompleto.', 400);
    }

    // Validar que el área tenga el cuerpo correcto
    const area = newDepto.area;
    if (!area.nombre || area.clave === undefined) {
      throw new customError('El cuerpo del área está incompleto.', 400);
    }

    // Validar que el área y el encargado existan
    if (!mongoose.Types.ObjectId.isValid(area.clave)) {
      throw new customError('El ID del área no existe', 404);
    }

    const areaExists = await areas.findOne({
      _id: area.clave,
      nombre: area.nombre,
    });

    if (!mongoose.Types.ObjectId.isValid(encargado.id)) {
      throw new customError('El ID del encargado no existe', 404);
    }

    const encargadoExists = await encargados.findOne({
      _id: encargado.id,
      nombre: encargado.nombre,
    });

    if (!areaExists) {
      throw new customError('El área no existe.', 404);
    }

    if (!encargadoExists) {
      throw new customError('El encargado no existe.', 404);
    }

    // Crear el nuevo departamento
    const nuevoDepartamento = new departamentos({
      nombre: newDepto.nombre,
      encargado: encargado.id,
      area: area.clave,
    });

    // Agregar el nuevo departamento a la lista
    await nuevoDepartamento.save();

    return nuevoDepartamento;
  }

  async modificarDepto(id, updatedDepto) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new customError('El ID del departamento no existe', 404);
    }

    const departamento = await this.getById(id);

    // Validar que el encargado tenga el cuerpo correcto
    const encargado = updatedDepto.encargado;
    if (!encargado.id || !encargado.nombre) {
      throw new customError('El cuerpo del encargado está incompleto.', 400);
    }

    // Validar que el área tenga el cuerpo correcto
    const area = updatedDepto.area;
    if (!area.nombre || area.clave === undefined) {
      throw new customError('El cuerpo del área está incompleto.', 400);
    }

    // Validar que el área y el encargado existan
    if (!mongoose.Types.ObjectId.isValid(area.clave)) {
      throw new customError('El ID del área no existe', 404);
    }

    const areaExists = await areas.findOne({
      _id: area.clave,
      nombre: area.nombre,
    });

    if (!mongoose.Types.ObjectId.isValid(encargado.id)) {
      throw new customError('El ID del encargado no existe', 404);
    }
    const encargadoExists = await encargados.findOne({
      _id: encargado.id,
      nombre: encargado.nombre,
    });

    if (!areaExists) {
      throw new customError('El área no existe.', 404);
    }

    if (!encargadoExists) {
      throw new customError('El encargado no existe.', 404);
    }

    // Actualizar el departamento
    departamento.nombre = updatedDepto.nombre;
    departamento.encargado = encargado.id;
    departamento.area = area.clave;

    await departamento.save();

    return departamento;
  }

  async delete(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new customError('El ID del departamento no existe.', 404);
    }

    const departamento = await this.getById(id);

    if (!departamento) {
      throw new customError(`El departamento con ID ${id} no existe.`, 404);
    }

    const { empleados } = require('../models/empleado');
    const empleadoAsignado = await empleados.findOne({
      $or: [
        { departamento_1: id },
        { departamento_2: id },
        { departamento_3: id },
      ],
    });

    if (empleadoAsignado) {
      throw new customError(
        'No se puede eliminar el departamento porque hay empleados asignados a él.',
        400,
      );
    }

    await departamentos.deleteOne({ _id: id });

    return { id };
  }
}

module.exports = departamentosService;
