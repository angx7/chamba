const departamentos = require('../lib/departamentosLib');
const nombreEmpleado = require('../lib/empleadosLib');
const DepartamentoService = require('../services/departamentoService');
const departamentosService = new DepartamentoService();

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

  agregarEmpleado(nuevoEmpleado) {
    if (
      !nuevoEmpleado.nombre ||
      !nuevoEmpleado.apellido ||
      !nuevoEmpleado.edad ||
      !nuevoEmpleado.genero ||
      !nuevoEmpleado.departamento_1 ||
      !nuevoEmpleado.departamento_2 ||
      !nuevoEmpleado.departamento_3
    ) {
      throw new Error('Faltan datos del empleado');
    }
    // this.validarDepartamento(nuevoEmpleado.departamento_1, 'departamento_1');
    // this.validarDepartamento(nuevoEmpleado.departamento_2, 'departamento_2');
    // this.validarDepartamento(nuevoEmpleado.departamento_3, 'departamento_3');
    // this.empleados.push(nuevoEmpleado);

    // const departamentosData = departamentosService.getAll();
    // const departamento1Existe = departamentosData.some(
    //   (departamento) =>
    //     departamento.numeroDepartamento === nuevoEmpleado.departamento_1.clave
    // );
    // const departamento2Existe = departamentosData.some(
    //   (departamento) =>
    //     departamento.numeroDepartamento === nuevoEmpleado.departamento_2.clave
    // );
    // const departamento3Existe = departamentosData.some(
    //   (departamento) =>
    //     departamento.numeroDepartamento === nuevoEmpleado.departamento_3.clave
    // );

    // if (!departamento1Existe || !departamento2Existe || !departamento3Existe) {
    //   throw new Error('Uno o más departamentos no existen');
    // }

    // const newId =
    //   this.empleados.length > 0
    //     ? this.empleados[this.empleados.length - 1].numeroEmpleado + 1
    //     : 1;

    // const empleado = {
    //   numeroEmpleado: newId,
    //   nombre: nuevoEmpleado.nombre,
    //   apellido: nuevoEmpleado.apellido,
    //   edad: nuevoEmpleado.edad,
    //   genero: nuevoEmpleado.genero,
    //   departamento_1: nuevoEmpleado.departamento_1,
    //   departamento_2: nuevoEmpleado.departamento_2,
    //   departamento_3: nuevoEmpleado.departamento_3,
    // };
    // this.empleados.push(empleado);
    return empleado;
  }

  validarDepartamento(departamento, nombreDepartamento) {
    if (
      !departamento.nombre ||
      !departamento.clave ||
      typeof departamento.clave !== 'number'
    ) {
      throw new Error(`El ${nombreDepartamento} no tiene el cuerpo correcto`);
    }
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
