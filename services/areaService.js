const areas = require('../lib/areaLib');

class areasService {
  constructor() {
    this.areas = [];
    this.crearAreas();
  }

  crearAreas() {
    for (let index = 0; index < areas.length; index++) {
      this.areas.push({
        idArea: index,
        Nombre: areas[index],
        edificio: 'Número de edificio ' + Math.floor(Math.random() * 10) + 1,
      });
    }
  }

  getAll() {
    return this.areas;
  }

  getById(id) {
    return this.areas.find((item) => item.idArea == id);
  }

  create() {}

  delete(id) {
    const area = this.getById(id);
    if (!area) {
      throw new Error(`El área con ID ${id} no existe.`);
    }

    const departamento = require('../services/departamentoService');
    const departamentosService = new departamento();
    const areaAsignada = departamentosService.getAll().some((area) => {
      return area.area.clave == id;
    });

    if (areaAsignada) {
      throw new Error(
        'No se puede eliminar esta área porque hay departamentos en ella'
      );
    }

    const index = this.areas.findIndex((area) => area.idArea == id);

    if (index !== -1) {
      this.areas.splice(index, 1);
    }

    return { id };
  }
}
module.exports = areasService;
