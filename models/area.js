const mongoose = require('mongoose');

const areaSchema = mongoose.Schema({
  nombre: { type: String, require: true },
  edificio: { type: Number, require: true },
});

const areas = mongoose.model('areas', areaSchema);

module.exports = { areas, areaSchema };
