const mongoose = require('mongoose');

const encargadoSchema = mongoose.Schema({
  nombre: { type: String, required: true },
  estudio: { type: String, required: true },
  turno: { type: String, required: true },
});

const encargados = mongoose.model('encargados', encargadoSchema);

module.exports = { encargados, encargadoSchema };
