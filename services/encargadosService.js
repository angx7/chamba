const encargados = require('../lib/encargadoLib');

class encargadosService {
  constructor() {
    this.encargados = [];
    this.crearEncargados();
  }

  crearEncargados() {
    for (let index = 0; index < encargados.length; index++) {
      this.encargados.push({
        idEncargado: index,
        nombre: encargados[index].nombre,
        Estudio: encargados[index].estudio,
        Turno: encargados[index].turno,
      });
    }
  }

  getAll() {
    return this.encargados;
  }

  getById(id) {
    return this.encargados.find((item) => item.idEncargado == id);
  }
}
module.exports = encargadosService;
