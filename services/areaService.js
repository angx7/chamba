const areas = require('../models/area');

class areasService {
  async getAll() {
    return await areas.find();
  }

  async getById(id) {
    return await areas.findOne({ _id: id });
  }

  async create(body) {
    const { nombre, edificio } = body;

    if (!nombre || !edificio) {
      throw new Error('El cuerpo de la petición no esta completa');
    }

    const newArea = new areas({
      nombre: nombre,
      edificio: edificio,
    });

    await newArea.save();
    return newArea;
  }

  async update(id, body) {
    const area = await this.getById(id);
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

    await area.save();
    return area;
  }

  async delete(id) {
    const area = await this.getById(id);
    if (!area) {
      throw new Error(`El área con ID ${id} no existe.`);
    }

    // const Departamento = require('../models/departamento');
    // const areaAsignada = await Departamento.findOne({ 'area.clave': id });

    // if (areaAsignada) {
    //   throw new Error(
    //     'No se puede eliminar esta área porque hay departamentos en ella',
    //   );
    // }

    await areas.deleteOne({ _id: id });
    return { id };
  }
}
module.exports = areasService;
