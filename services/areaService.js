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
}
module.exports = areasService;
