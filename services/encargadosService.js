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

  createEncargado(nuevoEncargado) {
    if (
      !nuevoEncargado.nombre ||
      !nuevoEncargado.Estudio ||
      !nuevoEncargado.Turno
    ) {
      throw new Error('El cuerpo del nuevo encargado no está completo');
    }
    const idEncargado = this.encargados.length;
    const encargado = {
      idEncargado,
      nombre: nuevoEncargado.nombre,
      Estudio: nuevoEncargado.Estudio,
      Turno: nuevoEncargado.Turno,
    };
    this.encargados.push(encargado);
    return encargado;
  }

  updateEncargado(id, updatedFields) {
    const encargado = this.getById(id);
    if (!encargado) {
      throw new Error(`El encargado con ID ${id} no existe`);
    }

    const { nombre, Estudio, Turno } = updatedFields;

    if (nombre === undefined && Estudio === undefined && Turno === undefined) {
      throw new Error('No se proporcionaron campos para actualizar');
    }

    if (nombre !== undefined && nombre.trim() === '') {
      throw new Error('El campo nombre no puede estar vacío');
    }
    if (Estudio !== undefined && Estudio.trim() === '') {
      throw new Error('El campo Estudio no puede estar vacío');
    }
    if (Turno !== undefined && Turno.trim() === '') {
      throw new Error('El campo Turno no puede estar vacío');
    }

    if (nombre !== undefined) {
      encargado.nombre = nombre;
    }
    if (Estudio !== undefined) {
      encargado.Estudio = Estudio;
    }
    if (Turno !== undefined) {
      encargado.Turno = Turno;
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
