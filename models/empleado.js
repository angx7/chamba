const mongoose = require('mongoose');

const empleadoSchema = mongoose.Schema({
  nombre: { type: String, required: true },
  estudio: { type: String, required: true },
  turno: { type: String, required: true },
});

const empleados = mongoose.model('empleados', empleadoSchema);

module.exports = empleados;
