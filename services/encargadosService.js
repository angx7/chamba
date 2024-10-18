const encargados = require('../lib/encargadoLib');

const departamentos = require('../services/departamentoService');
const departamentosService = new departamentos();

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

  delete(id) {
    const encargado = this.getById(id);
    if (!encargado) {
      throw new Error(`El encargado con ID ${id} no existe`);
    }
    const encargadoAsignado = departamentosService
      .getAll()
      .some((departamento) => departamento.encargado.id == id);
    if (encargadoAsignado) {
      throw new Error(
        'No se puede eliminar a este encargado porque esta asignado a un departamento'
      );
    }
    const index = this.encargados.findIndex(
      (encargado) => encargado.idEncargado == id
    );
    console.log(index);
    if (index !== -1) {
      this.encargados.splice(index, 1);
    }
    return { id };
  }
}
module.exports = encargadosService;
