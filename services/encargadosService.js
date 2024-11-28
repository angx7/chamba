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
        estudio: encargados[index].estudio,
        turno: encargados[index].turno,
      });
    }
  }

  getAll() {
    return this.encargados;
  }

  getById(id) {
    return this.encargados.find((item) => item.idEncargado == id);
  }

  createEncargado(nuevoEncargado) {
    if (
      !nuevoEncargado.nombre ||
      !nuevoEncargado.estudio ||
      !nuevoEncargado.turno
    ) {
      throw new Error('El cuerpo del nuevo encargado no está completo');
    }
    const idEncargado = this.encargados.length;
    const encargado = {
      idEncargado,
      nombre: nuevoEncargado.nombre,
      estudio: nuevoEncargado.estudio,
      turno: nuevoEncargado.turno,
    };
    this.encargados.push(encargado);
    return encargado;
  }

  updateEncargado(id, updatedFields) {
    const encargado = this.getById(id);
    if (!encargado) {
      throw new Error(`El encargado con ID ${id} no existe`);
    }

    const { nombre, estudio, turno } = updatedFields;

    if (nombre === undefined && estudio === undefined && turno === undefined) {
      throw new Error('No se proporcionaron campos para actualizar');
    }

    if (nombre !== undefined && nombre.trim() === '') {
      throw new Error('El campo nombre no puede estar vacío');
    }
    if (estudio !== undefined && estudio.trim() === '') {
      throw new Error('El campo estudio no puede estar vacío');
    }
    if (turno !== undefined && turno.trim() === '') {
      throw new Error('El campo turno no puede estar vacío');
    }

    if (nombre !== undefined) {
      encargado.nombre = nombre;
    }
    if (estudio !== undefined) {
      encargado.estudio = estudio;
    }
    if (turno !== undefined) {
      encargado.turno = turno;
    }

    return encargado;
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
        'No se puede eliminar a este encargado porque esta asignado a un departamento',
      );
    }
    const index = this.encargados.findIndex(
      (encargado) => encargado.idEncargado == id,
    );
    if (index !== -1) {
      this.encargados.splice(index, 1);
    }
    return { id };
  }
}
module.exports = encargadosService;
