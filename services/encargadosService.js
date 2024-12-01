const { encargados } = require('../models/encargado');

class encargadosService {
  async getAll() {
    return await encargados.find();
  }

  async getById(id) {
    return await encargados.findOne({ _id: id });
  }

  async createEncargado(nuevoEncargado) {
    if (
      !nuevoEncargado.nombre ||
      !nuevoEncargado.estudio ||
      !nuevoEncargado.turno
    ) {
      throw new Error('El cuerpo del nuevo encargado no está completo');
    }

    const encargado = new encargados({
      nombre: nuevoEncargado.nombre,
      estudio: nuevoEncargado.estudio,
      turno: nuevoEncargado.turno,
    });

    await encargado.save();
    return encargado;
  }

  async updateEncargado(id, updatedFields) {
    const encargado = await this.getById(id);
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

    await encargado.save();
    return encargado;
  }

  async delete(id) {
    const encargado = await this.getById(id);
    if (!encargado) {
      throw new Error(`El encargado con ID ${id} no existe`);
    }

    // const encargadoAsignado = await Departamento.findOne({
    //   'encargado.id': id,
    // });

    // if (encargadoAsignado) {
    //   throw new Error(
    //     'No se puede eliminar a este encargado porque está asignado a un departamento',
    //   );
    // }

    await encargados.deleteOne({ _id: id });
    return { id };
  }
}
module.exports = encargadosService;
