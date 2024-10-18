const departamentos = require('../lib/departamentosLib');
const nombreEmpleado = require('../lib/empleadosLib');

function seleccionarDepartamentosAleatorios(departamentos) {
  const seleccionados = [];
  const claveDepartamento = [];
  while (seleccionados.length < 3) {
    const indiceAleatorio = Math.floor(Math.random() * departamentos.length);
    const departamentoSeleccionado = departamentos[indiceAleatorio];
    if (!seleccionados.includes(departamentoSeleccionado)) {
      seleccionados.push(departamentoSeleccionado);
      claveDepartamento.push(indiceAleatorio);
    }
  }
  return [seleccionados, claveDepartamento];
}

class empleadoService {
  constructor() {
    this.empleados = [];
    this.crearEmpleado();
  }

  crearEmpleado() {
    for (let index = 0; index < nombreEmpleado.length; index++) {
      const [departamentosAleatorios, claveDepartamento] =
        seleccionarDepartamentosAleatorios(departamentos);

      this.empleados.push({
        numeroEmpleado: index,
        nombre: nombreEmpleado[index].nombre,
        apellido: nombreEmpleado[index].apellido,
        edad: Math.floor(Math.random() * 10) + 18,
        genero: nombreEmpleado[index].genero,
        departamento_1: {
          nombre: departamentosAleatorios[0],
          clave: claveDepartamento[0],
        },
        departamento_2: {
          nombre: departamentosAleatorios[1],
          clave: claveDepartamento[1],
        },
        departamento_3: {
          nombre: departamentosAleatorios[2],
          clave: claveDepartamento[2],
        },
      });
    }
  }

  getAll() {
    return this.empleados;
  }

  getById(id) {
    return this.empleados.find((item) => item.numeroEmpleado == id);
  }

  delete(id) {
    const empleadoEliminar = this.empleados.findIndex(
      (item) => item.numeroEmpleado == id
    );
    if (empleadoEliminar !== -1) {
      this.empleados.splice(empleadoEliminar, 1);
      return empleadoEliminar;
    } else {
      return empleadoEliminar;
    }
  }
}
module.exports = empleadoService;
