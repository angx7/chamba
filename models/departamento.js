const mongoose = require('mongoose');
const { Schema } = mongoose;

const departamentoSchema = mongoose.Schema({
  nombre: { type: String, required: true },
  encargado: { type: Schema.Types.ObjectId, ref: 'encargados', required: true },
  area: { type: Schema.Types.ObjectId, ref: 'areas', required: true },
});

const departamentos = mongoose.model('departamentos', departamentoSchema);

module.exports = { departamentos, departamentoSchema };
