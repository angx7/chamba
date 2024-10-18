const departamentos = require('../lib/departamentosLib');
const nombreEmpleado = require('../lib/empleadosLib');

function seleccionarDepartamentosAleatorios(departamentos) {
  const seleccionados = [];

  while (seleccionados.length < 3) {
    const indiceAleatorio = Math.floor(Math.random() * departamentos.length);
    const departamentoSeleccionado = departamentos[indiceAleatorio];
    if (!seleccionados.includes(departamentoSeleccionado)) {
      seleccionados.push(departamentoSeleccionado);
    }
  }
  return [seleccionados];
}

class empleadoService {
  constructor() {
    this.empleados = [];
    this.crearEmpleado();
  }

  crearEmpleado() {
    for (let index = 0; index < nombreEmpleado.length; index++) {
      const [departamentosAleatorios] =
        seleccionarDepartamentosAleatorios(departamentos);

      this.empleados.push({
        numeroEmpleado: index,
        nombre: nombreEmpleado[index].nombre,
        apellido: nombreEmpleado[index].apellido,
        edad: Math.floor(Math.random() * 10) + 18,
        genero: nombreEmpleado[index].genero,
        departamento_1: departamentosAleatorios[0],
        departamento_2: departamentosAleatorios[1],
        departamento_3: departamentosAleatorios[2],
      });
    }
  }

  getAll() {
    return this.empleados;
  }

  getById(id) {
    return this.empleados.find((item) => item.numeroEmpleado == id);
  }
}
module.exports = empleadoService;
