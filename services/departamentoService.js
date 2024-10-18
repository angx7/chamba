const departamentos = require('../lib/departamentosLib');
const encargados = require('../lib/encargadoLib');
const areas = require('../lib/areaLib');

class departamentosService {
  constructor() {
    this.departamentos = [];
    this.crearDepartamentos();
  }
  crearDepartamentos() {
    for (let index = 0; index < departamentos.length; index++) {
      this.departamentos.push({
        numeroDepartamento: index,
        nombre: departamentos[index],
        encargado: encargados[index],
        area: { nombre: areas[index], clave: index },
      });
    }
  }

  getAll() {
    return this.departamentos;
  }

  getById(id) {
    return this.departamentos.find((item) => item.numeroDepartamento == id);
  }

  createDepto(newDepto) {
    // Validar que el cuerpo esté completo
    if (!newDepto.nombre || !newDepto.encargado || !newDepto.area) {
      throw new Error('El cuerpo del nuevo departamento está incompleto.');
    }
    // Validar que el encargado tenga el cuerpo correcto
    const encargado = newDepto.encargado;
    if (
      !encargado.id ||
      !encargado.nombre ||
      !encargado.estudio ||
      !encargado.turno
    ) {
      throw new Error('El cuerpo del encargado está incompleto.');
    }

    // Validar que el área tenga el cuerpo correcto
    const area = newDepto.area;
    if (!area.nombre || area.clave === undefined) {
      throw new Error('El cuerpo del área está incompleto.');
    }

    // Importar el servicio de áreas y encargados
    const areasService = require('../services/areaService');
    const areas = new areasService();
    const encargadosService = require('../services/encargadosService');
    const Encargados = new encargadosService();

    // Validar que el área y el encargado existan
    const areaExists = areas
      .getAll()
      .find((item) => item.idArea == area.clave && item.Nombre == area.nombre);
    const encargadoExists = Encargados.getById(encargado.id);

    if (!areaExists) {
      throw new Error('El área especificada no existe.');
    }

    if (!encargadoExists) {
      throw new Error('El encargado especificado no existe.');
    }

    // Asignar un nuevo número de departamento
    const nuevoNumeroDepartamento = this.departamentos.length;

    // Crear el nuevo departamento
    const nuevoDepartamento = {
      numeroDepartamento: nuevoNumeroDepartamento,
      nombre: newDepto.nombre,
      encargado: newDepto.encargado,
      area: newDepto.area,
    };

    // Agregar el nuevo departamento a la lista
    this.departamentos.push(nuevoDepartamento);

    return nuevoDepartamento;
  }

  modificarDepto(id, updatedDepto) {
    const departamento = this.getById(id);
    if (!departamento) {
      throw new Error(`El departamento con ID ${id} no existe.`);
    }

    // Validar que el cuerpo esté completo
    // if (!updatedDepto.nombre || !updatedDepto.encargado || !updatedDepto.area) {
    //   throw new Error(
    //     'El cuerpo del departamento actualizado está incompleto.'
    //   );
    // }

    // Validar que el encargado tenga el cuerpo correcto
    const encargado = updatedDepto.encargado;
    if (
      !encargado.id ||
      !encargado.nombre ||
      !encargado.estudio ||
      !encargado.turno
    ) {
      throw new Error('El cuerpo del encargado está incompleto.');
    }

    // Validar que el área tenga el cuerpo correcto
    const area = updatedDepto.area;
    if (!area.nombre || area.clave === undefined) {
      throw new Error('El cuerpo del área está incompleto.');
    }

    // Importar el servicio de áreas y encargados
    const areasService = require('../services/areaService');
    const areas = new areasService();
    const encargadosService = require('../services/encargadosService');
    const Encargados = new encargadosService();

    // Validar que el área y el encargado existan
    const areaExists = areas
      .getAll()
      .find((item) => item.idArea == area.clave && item.Nombre == area.nombre);
    const encargadoExists = Encargados.getById(encargado.id);

    if (!areaExists) {
      throw new Error('El área especificada no existe.');
    }

    if (!encargadoExists) {
      throw new Error('El encargado especificado no existe.');
    }

    // Actualizar el departamento
    departamento.nombre = updatedDepto.nombre;
    departamento.encargado = updatedDepto.encargado;
    departamento.area = updatedDepto.area;

    return departamento;
  }

  delete(id) {
    const departamento = this.getById(id);
    if (!departamento) {
      throw new Error(`El departamento con ID ${id} no existe.`);
    }
    const empleados = require('../services/empleadoService');
    const areasService = require('../services/areaService');
    const encargadosService = require('../services/encargadosService');
    const empleadoService = new empleados();
    const departamentoClave = id;
    const empleadoAsignado = empleadoService.getAll().some((empleado) => {
      const departamentosEmpleado = [
        empleado.departamento_1.clave,
        empleado.departamento_2.clave,
        empleado.departamento_3.clave,
      ];

      return departamentosEmpleado.includes(departamentoClave);
    });

    if (empleadoAsignado) {
      throw new Error(
        'No se puede eliminar el departamento porque hay empleados asignados a él.'
      );
    }

    // Encontrar el índice del departamento
    const index = this.departamentos.findIndex(
      (departamento) => departamento.numeroDepartamento === id
    );

    // Eliminar el departamento si no hay empleados asignados
    if (index !== -1) {
      this.departamentos.splice(index, 1);
    }

    return { id };
  }
}

module.exports = departamentosService;
