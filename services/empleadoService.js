const { empleados } = require('../models/empleado');
const { departamentos } = require('../models/departamento');
const mongoose = require('mongoose');
const customError = require('../utils/customError');

class empleadoService {
  async getAll() {
    return await empleados
      .find()
      .populate('departamento_1 departamento_2 departamento_3');
  }

  async getById(id) {
    if (mongoose.Types.ObjectId.isValid(id)) {
      return await empleados
        .findOne({ _id: id })
        .populate('departamento_1 departamento_2 departamento_3');
    }
    throw new customError('El Id del empleado no existe', 404);
  }

  async agregarEmpleado(nuevoEmpleado) {
    if (
      !nuevoEmpleado.nombre ||
      !nuevoEmpleado.apellido ||
      !nuevoEmpleado.edad ||
      !nuevoEmpleado.genero ||
      !nuevoEmpleado.departamento_1.nombre ||
      !nuevoEmpleado.departamento_1.clave ||
      !nuevoEmpleado.departamento_2.nombre ||
      !nuevoEmpleado.departamento_2.clave ||
      !nuevoEmpleado.departamento_3.nombre ||
      !nuevoEmpleado.departamento_3.clave
    ) {
      throw new customError(
        'Algo salio mal porque faltan datos del empleado',
        400,
      );
    }

    if (
      nuevoEmpleado.departamento_1.clave ===
        nuevoEmpleado.departamento_2.clave ||
      nuevoEmpleado.departamento_1.clave ===
        nuevoEmpleado.departamento_3.clave ||
      nuevoEmpleado.departamento_2.clave === nuevoEmpleado.departamento_3.clave
    ) {
      throw new customError('no puede tener 2 departamentos iguales', 400);
    }

    // Validar que los departamentos tengan el cuerpo correcto
    if (!mongoose.Types.ObjectId.isValid(nuevoEmpleado.departamento_1.clave)) {
      throw new customError('departamento_1 no existe', 404);
    }

    const departamento_1Existe = await departamentos.findOne({
      _id: nuevoEmpleado.departamento_1.clave,
      nombre: nuevoEmpleado.departamento_1.nombre,
    });

    if (!departamento_1Existe) {
      throw new customError('departamento_1 no existe', 404);
    }

    if (!mongoose.Types.ObjectId.isValid(nuevoEmpleado.departamento_2.clave)) {
      throw new customError('departamento_2 no existe', 404);
    }

    const departamento_2Existe = await departamentos.findOne({
      _id: nuevoEmpleado.departamento_2.clave,
      nombre: nuevoEmpleado.departamento_2.nombre,
    });

    if (!departamento_2Existe) {
      throw new customError('departamento_2 no existe', 404);
    }

    if (!mongoose.Types.ObjectId.isValid(nuevoEmpleado.departamento_3.clave)) {
      throw new customError('departamento_3 no existe', 404);
    }

    const departamento_3Existe = await departamentos.findOne({
      _id: nuevoEmpleado.departamento_3.clave,
      nombre: nuevoEmpleado.departamento_3.nombre,
    });

    if (!departamento_3Existe) {
      throw new customError('departamento_3 no existe', 404);
    }

    const empleado = new empleados({
      nombre: nuevoEmpleado.nombre,
      apellido: nuevoEmpleado.apellido,
      edad: nuevoEmpleado.edad,
      genero: nuevoEmpleado.genero,
      departamento_1: nuevoEmpleado.departamento_1.clave,
      departamento_2: nuevoEmpleado.departamento_2.clave,
      departamento_3: nuevoEmpleado.departamento_3.clave,
    });

    // Agregar el nuevo empleado a la lista
    await empleado.save();

    return empleado;
  }

  async modificarEmpleado(id, datosActualizados) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new customError('El empleado no existe', 404);
    }

    const empleado = await this.getById(id);

    if (!empleado) {
      throw new customError('El empleado no existe', 404);
    }

    if (
      datosActualizados.departamento_1.clave ===
        datosActualizados.departamento_2.clave ||
      datosActualizados.departamento_1.clave ===
        datosActualizados.departamento_3.clave ||
      datosActualizados.departamento_2.clave ===
        datosActualizados.departamento_3.clave
    ) {
      throw new customError('no puede tener 2 departamentos iguales', 400);
    }

    if (datosActualizados.nombre) {
      empleado.nombre = datosActualizados.nombre;
    }

    if (datosActualizados.apellido) {
      empleado.apellido = datosActualizados.apellido;
    }

    if (datosActualizados.edad) {
      empleado.edad = datosActualizados.edad;
    }

    if (datosActualizados.genero) {
      empleado.genero = datosActualizados.genero;
    }

    if (
      datosActualizados.departamento_1.clave &&
      datosActualizados.departamento_1.nombre
    ) {
      if (
        !mongoose.Types.ObjectId.isValid(datosActualizados.departamento_1.clave)
      ) {
        throw new customError('departamento_1 no existe', 404);
      }

      const departamento_1Existe = await departamentos.findOne({
        _id: datosActualizados.departamento_1.clave,
        nombre: datosActualizados.departamento_1.nombre,
      });

      if (!departamento_1Existe) {
        throw new customError('departamento_1 no existe', 404);
      }

      empleado.departamento_1 = datosActualizados.departamento_1.clave;
    }

    if (
      datosActualizados.departamento_2.clave &&
      datosActualizados.departamento_2.nombre
    ) {
      if (
        !mongoose.Types.ObjectId.isValid(datosActualizados.departamento_2.clave)
      ) {
        throw new customError('departamento_2 no existe', 404);
      }

      const departamento_2Existe = await departamentos.findOne({
        _id: datosActualizados.departamento_2.clave,
        nombre: datosActualizados.departamento_2.nombre,
      });

      if (!departamento_2Existe) {
        throw new customError('departamento_2 no existe', 404);
      }

      empleado.departamento_2 = datosActualizados.departamento_2.clave;
    }

    if (
      datosActualizados.departamento_3.clave &&
      datosActualizados.departamento_3.nombre
    ) {
      if (
        !mongoose.Types.ObjectId.isValid(datosActualizados.departamento_3.clave)
      ) {
        throw new customError('departamento_3 no existe', 404);
      }

      const departamento_3Existe = await departamentos.findOne({
        _id: datosActualizados.departamento_3.clave,
        nombre: datosActualizados.departamento_3.nombre,
      });

      if (!departamento_3Existe) {
        throw new customError('departamento_3 no existe', 404);
      }

      empleado.departamento_3 = datosActualizados.departamento_3.clave;
    }

    await empleado.save();

    return empleado;
  }

  async delete(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new customError('El Id del empleado no existe', 404);
    }

    const empleadoEliminar = await this.getById(id);

    if (!empleadoEliminar) {
      throw new customError(`El empleado con ID ${id} no existe.`, 404);
    }

    await empleados.deleteOne({ _id: id });

    return { id };
  }
}

module.exports = empleadoService;
