const areasRoutes = require('./areaRoutes');
const departamentosRoutes = require('./departamentoRoutes');
const empleadosRoutes = require('./empleadoRoutes');
const encargadosRoutes = require('./encargadoRoutes');

function routerApi(app) {
  app.use('/areas', areasRoutes);
  app.use('/departamentos', departamentosRoutes);
  app.use('/empleados', empleadosRoutes);
  app.use('/encargados', encargadosRoutes);
}

module.exports = routerApi;
