const { empleados } = require('../models/empleado');
const { departamentos } = require('../models/departamento');
const mongoose = require('mongoose');
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
    return null;
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
      throw new Error('Algo salio mal porque faltan datos del empleado');
    }

    if (
      nuevoEmpleado.departamento_1.clave ===
        nuevoEmpleado.departamento_2.clave ||
      nuevoEmpleado.departamento_1.clave ===
        nuevoEmpleado.departamento_3.clave ||
      nuevoEmpleado.departamento_2.clave === nuevoEmpleado.departamento_3.clave
    ) {
      throw new Error('no puede tener 2 departamentos iguales');
    }

    // Validar que los departamentos tengan el cuerpo correcto
    if (!mongoose.Types.ObjectId.isValid(nuevoEmpleado.departamento_1.clave)) {
      throw new Error('departamento_1 no existe');
    }

    const departamento_1Existe = await departamentos.findOne({
      _id: nuevoEmpleado.departamento_1.clave,
      nombre: nuevoEmpleado.departamento_1.nombre,
    });

    if (!departamento_1Existe) {
      throw new Error('departamento_1 no existe');
    }

    if (!mongoose.Types.ObjectId.isValid(nuevoEmpleado.departamento_2.clave)) {
      throw new Error('departamento_2 no existe');
    }

    const departamento_2Existe = await departamentos.findOne({
      _id: nuevoEmpleado.departamento_2.clave,
      nombre: nuevoEmpleado.departamento_2.nombre,
    });

    if (!departamento_2Existe) {
      throw new Error('departamento_2 no existe');
    }

    if (!mongoose.Types.ObjectId.isValid(nuevoEmpleado.departamento_3.clave)) {
      throw new Error('departamento_3 no existe');
    }

    const departamento_3Existe = await departamentos.findOne({
      _id: nuevoEmpleado.departamento_3.clave,
      nombre: nuevoEmpleado.departamento_3.nombre,
    });

    if (!departamento_3Existe) {
      throw new Error('departamento_3 no existe');
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
      throw new Error('El empleado no existe');
    }

    const empleado = await this.getById(id);

    if (!empleado) {
      throw new Error('El empleado no existe');
    }

    if (
      datosActualizados.departamento_1.clave ===
        datosActualizados.departamento_2.clave ||
      datosActualizados.departamento_1.clave ===
        datosActualizados.departamento_3.clave ||
      datosActualizados.departamento_2.clave ===
        datosActualizados.departamento_3.clave
    ) {
      throw new Error('no puede tener 2 departamentos iguales');
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
        throw new Error('departamento_1 no existe');
      }

      const departamento_1Existe = await departamentos.findOne({
        _id: datosActualizados.departamento_1.clave,
        nombre: datosActualizados.departamento_1.nombre,
      });

      if (!departamento_1Existe) {
        throw new Error('departamento_1 no existe');
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
        throw new Error('departamento_2 no existe');
      }

      const departamento_2Existe = await departamentos.findOne({
        _id: datosActualizados.departamento_2.clave,
        nombre: datosActualizados.departamento_2.nombre,
      });

      if (!departamento_2Existe) {
        throw new Error('departamento_2 no existe');
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
        throw new Error('departamento_3 no existe');
      }

      const departamento_3Existe = await departamentos.findOne({
        _id: datosActualizados.departamento_3.clave,
        nombre: datosActualizados.departamento_3.nombre,
      });

      if (!departamento_3Existe) {
        throw new Error('departamento_3 no existe');
      }

      empleado.departamento_3 = datosActualizados.departamento_3.clave;
    }

    await empleado.save();

    return empleado;
  }

  async delete(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('El Id del empleado no existe');
    }

    const empleadoEliminar = await this.getById(id);

    if (!empleadoEliminar) {
      throw new Error(`El empleado con ID ${id} no existe.`);
    }

    await empleados.deleteOne({ _id: id });

    return { id };
  }
}

module.exports = empleadoService;
