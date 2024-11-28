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
        nombre: areas[index],
        edificio: Math.floor(Math.random() * 10) + 1,
      });
    }
  }

  getAll() {
    return this.areas;
  }

  getById(id) {
    return this.areas.find((item) => item.idArea == id);
  }

  create(body) {
    const { nombre, edificio } = body;

    if (!nombre || !edificio) {
      throw new Error('El cuerpo de la petición no esta completa');
    }

    const newArea = {
      idArea: this.areas.length,
      nombre,
      edificio,
    };

    this.areas.push(newArea);
    return newArea;
  }

  update(id, body) {
    const area = this.getById(id);
    if (!area) {
      throw new Error(`El área con ID ${id} no existe.`);
    }

    const { nombre, edificio } = body;

    if (nombre !== undefined) {
      if (nombre.trim() === '') {
        throw new Error('El campo nombre no puede estar vacío.');
      }
      area.nombre = nombre;
    }

    if (edificio !== undefined) {
      if (typeof edificio !== 'number' || isNaN(edificio)) {
        throw new Error('El campo edificio debe ser un número válido.');
      }
      area.edificio = edificio;
    }

    return area;
  }

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
        'No se puede eliminar esta área porque hay departamentos en ella',
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
