const { departamentos } = require('../models/departamento');
const { encargados } = require('../models/encargado');
const { areas } = require('../models/area');
const mongoose = require('mongoose');

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
    return null;
  }

  async createDepto(newDepto) {
    // Validar que el cuerpo esté completo
    if (!newDepto.nombre || !newDepto.encargado || !newDepto.area) {
      throw new Error('El cuerpo del nuevo departamento está incompleto.');
    }
    // Validar que el encargado tenga el cuerpo correcto
    const encargado = newDepto.encargado;
    if (!encargado.id || !encargado.nombre) {
      throw new Error('El cuerpo del encargado está incompleto.');
    }

    // Validar que el área tenga el cuerpo correcto
    const area = newDepto.area;
    if (!area.nombre || area.clave === undefined) {
      throw new Error('El cuerpo del área está incompleto.');
    }

    // Validar que el área y el encargado existan
    if (!mongoose.Types.ObjectId.isValid(area.clave)) {
      throw new Error('El ID del área no existe');
    }

    const areaExists = await areas.findOne({
      _id: area.clave,
      nombre: area.nombre,
    });

    if (!mongoose.Types.ObjectId.isValid(encargado.id)) {
      throw new Error('El ID del encargado no existe');
    }

    const encargadoExists = await encargados.findOne({
      _id: encargado.id,
      nombre: encargado.nombre,
    });

    if (!areaExists) {
      throw new Error('El área no existe.');
    }

    if (!encargadoExists) {
      throw new Error('El encargado no existe.');
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
      throw new Error('El ID del departamento no existe');
    }

    const departamento = await this.getById(id);

    // Validar que el encargado tenga el cuerpo correcto
    const encargado = updatedDepto.encargado;
    if (!encargado.id || !encargado.nombre) {
      throw new Error('El cuerpo del encargado está incompleto.');
    }

    // Validar que el área tenga el cuerpo correcto
    const area = updatedDepto.area;
    if (!area.nombre || area.clave === undefined) {
      throw new Error('El cuerpo del área está incompleto.');
    }

    // Validar que el área y el encargado existan
    if (!mongoose.Types.ObjectId.isValid(area.clave)) {
      throw new Error('El ID del área no existe');
    }

    const areaExists = await areas.findOne({
      _id: area.clave,
      nombre: area.nombre,
    });

    if (!mongoose.Types.ObjectId.isValid(encargado.id)) {
      throw new Error('El ID del encargado no existe');
    }
    const encargadoExists = await encargados.findOne({
      _id: encargado.id,
      nombre: encargado.nombre,
    });

    if (!areaExists) {
      throw new Error('El área no existe.');
    }

    if (!encargadoExists) {
      throw new Error('El encargado no existe.');
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
      throw new Error('El ID del departamento no existe.');
    }

    const departamento = await this.getById(id);

    if (!departamento) {
      throw new Error(`El departamento con ID ${id} no existe.`);
    }

    const { empleados } = require('../models/empleado');
    const empleadoAsignado = await empleados.findOne({
      $or: [
        { departamento_1: id },
        { departamento_2: id },
        { departamento_3: id },
      ],
    });

    console.log(empleadoAsignado);
    if (empleadoAsignado) {
      throw new Error(
        'No se puede eliminar el departamento porque hay empleados asignados a él.',
      );
    }

    await departamentos.deleteOne({ _id: id });

    return { id };
  }
}

module.exports = departamentosService;
