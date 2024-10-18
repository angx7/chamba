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

  delete(id) {
    const departamento = this.getById(id);
    if (!departamento) {
      throw new Error(`El departamento con ID ${id} no existe.`);
    }
    const empleados = require('../services/empleadoService');
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
