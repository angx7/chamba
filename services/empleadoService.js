const { empleados } = require('../models/empleado');
const { departamentos } = require('../models/departamento');
class empleadoService {
  async getAll() {
    return await empleados
      .find()
      .populate('departamento_1 departamento_2 departamento_3');
  }

  async getById(id) {
    return await empleados
      .findOne({ _id: id })
      .populate('departamento_1 departamento_2 departamento_3');
  }

  async agregarEmpleado(nuevoEmpleado) {
    try {
      if (
        !nuevoEmpleado.nombre ||
        !nuevoEmpleado.apellido ||
        !nuevoEmpleado.edad ||
        !nuevoEmpleado.genero ||
        !nuevoEmpleado.departamento_1 ||
        !nuevoEmpleado.departamento_2 ||
        !nuevoEmpleado.departamento_3
      ) {
        throw new Error('Algo salio mal porque faltan datos del empleado');
      }

      // Validar que los departamentos tengan el cuerpo correcto
      try {
        const departamento_1Existe = await departamentos.findOne({
          _id: nuevoEmpleado.departamento_1.clave,
          mombre: nuevoEmpleado.departamento_1.nombre,
        });
      } catch (error) {
        throw new Error('departamento_1 no encontrado');
      }

      try {
        const departamento_2Existe = await departamentos.findOne({
          _id: nuevoEmpleado.departamento_2.clave,
          nombre: nuevoEmpleado.departamento_2.nombre,
        });
      } catch (error) {
        throw new Error('departamento_2 no encontrado');
      }
      try {
        const departamento_3Existe = await departamentos.findOne({
          _id: nuevoEmpleado.departamento_3.clave,
          nombre: nuevoEmpleado.departamento_3.nombre,
        });
      } catch (error) {
        throw new Error('departamento_3 no encontrado');
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
    } catch (e) {
      throw new Error('Error interno del servidor');
    }
  }

  async modificarEmpleado(id, datosActualizados) {
    try {
      let empleado;
      try {
        empleado = await this.getById(id);
      } catch (e) {
        throw new Error('empleado no encontrado');
      }

      if (datosActualizados.departamento_1) {
        try {
          const departamento_1Existe = await departamentos.findOne({
            _id: id,
            nombre: datosActualizados.departamento_1.nombre,
          });
        } catch (e) {
          throw new Error('departamento_1 no encontrado');
        }
        empleado.departamento_1 = datosActualizados.departamento_1.clave;
      }

      if (datosActualizados.departamento_2) {
        try {
          const departamento_2Existe = await departamentos.findOne({
            _id: id,
            nombre: datosActualizados.departamento_2.nombre,
          });
        } catch (e) {
          throw new Error('departamento_2 no encontrado');
        }
        empleado.departamento_2 = datosActualizados.departamento_2.clave;
      }

      if (datosActualizados.departamento_3) {
        try {
          const departamento_3Existe = await departamentos.findOne({
            _id: id,
            nombre: datosActualizados.departamento_3.nombre,
          });
        } catch (e) {
          throw new Error('departamento_3 no encontrado');
        }
        empleado.departamento_3 = datosActualizados.departamento_3.clave;
      }

      Object.assign(empleado, datosActualizados);

      await empleado.save();

      return empleado;
    } catch (e) {
      throw new Error('Error interno del servidor');
    }
  }

  async delete(id) {
    try {
      try {
        const empleadoEliminar = await this.getById(id);
      } catch (error) {
        throw new Error('Empleado no encontrado');
      }

      await empleados.deleteOne({ _id: id });

      return { id };
    } catch (error) {
      throw new Error('Error interno del servidor');
    }
  }
}

module.exports = empleadoService;
