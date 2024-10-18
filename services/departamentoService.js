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
        area: areas[index] + ', clave de área: ' + index,
      });
    }
  }

  getAll() {
    console.log(encargados.length);
    return this.departamentos;
  }

  getById(id) {
    return this.departamentos.find((item) => item.numeroDepartamento == id);
  }
}

module.exports = departamentosService;
