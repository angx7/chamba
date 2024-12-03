const mongoose = require('mongoose');
const { Schema } = mongoose;

const empleadoSchema = mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  edad: { type: Number, required: true },
  genero: { type: String, required: true },
  departamento_1: {
    type: Schema.Types.ObjectId,
    ref: 'departamentos',
    required: true,
  },
  departamento_2: {
    type: Schema.Types.ObjectId,
    ref: 'departamentos',
    required: true,
  },
  departamento_3: {
    type: Schema.Types.ObjectId,
    ref: 'departamentos',
    required: true,
  },
});

const empleados = mongoose.model('empleados', empleadoSchema);

module.exports = { empleados };
