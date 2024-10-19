const departamentos = require('../lib/departamentosLib');
const nombreEmpleado = require('../lib/empleadosLib');
const departamentosService = require('../services/departamentoService');
const DepartamentosService = new departamentosService();

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
      throw new Error('Algo salio mal porque faltan datos del empleado');
    }

    // Validar que los departamentos tengan el cuerpo correcto
    this.validarDepartamento(nuevoEmpleado.departamento_1, 'departamento_1');
    this.validarDepartamento(nuevoEmpleado.departamento_2, 'departamento_2');
    this.validarDepartamento(nuevoEmpleado.departamento_3, 'departamento_3');

    // Verificar la existencia de los departamentos
    const departamentosData = DepartamentosService.getAll();
    const departamento1Existe = departamentosData.some(
      (departamento) =>
        departamento.numeroDepartamento ===
          nuevoEmpleado.departamento_1.clave &&
        departamento.nombre === nuevoEmpleado.departamento_1.nombre
    );
    const departamento2Existe = departamentosData.some(
      (departamento) =>
        departamento.numeroDepartamento ===
          nuevoEmpleado.departamento_2.clave &&
        departamento.nombre === nuevoEmpleado.departamento_2.nombre
    );
    const departamento3Existe = departamentosData.some(
      (departamento) =>
        departamento.numeroDepartamento ===
          nuevoEmpleado.departamento_3.clave &&
        departamento.nombre === nuevoEmpleado.departamento_3.nombre
    );

    if (!departamento1Existe || !departamento2Existe || !departamento3Existe) {
      throw new Error(
        'Algo salio mal porque uno o más departamentos no existen'
      );
    }

    const newId =
      this.empleados.length > 0
        ? this.empleados[this.empleados.length - 1].numeroEmpleado + 1
        : 1;

    // Crear el nuevo empleado
    const empleado = {
      numeroEmpleado: newId,
      nombre: nuevoEmpleado.nombre,
      apellido: nuevoEmpleado.apellido,
      edad: nuevoEmpleado.edad,
      genero: nuevoEmpleado.genero,
      departamento_1: nuevoEmpleado.departamento_1,
      departamento_2: nuevoEmpleado.departamento_2,
      departamento_3: nuevoEmpleado.departamento_3,
    };

    // Agregar el nuevo empleado a la lista
    this.empleados.push(empleado);

    return empleado;
  }

  validarDepartamento(departamento, nombreDepartamento) {
    if (
      !departamento.nombre ||
      departamento.clave === undefined ||
      typeof departamento.clave !== 'number'
    ) {
      throw new Error(
        `Algo salio mal porque el ${nombreDepartamento} no tiene el cuerpo correcto`
      );
    }
  }

  modificarEmpleado(id, datosActualizados) {
    const empleadoIndex = this.empleados.findIndex(
      (item) => item.numeroEmpleado == id
    );

    if (empleadoIndex === -1) {
      throw new Error('Empleado no encontrado');
    }

    const empleadoExistente = this.empleados[empleadoIndex];

    // Validar y actualizar solo los departamentos proporcionados
    if (datosActualizados.departamento_1) {
      this.validarDepartamento(
        datosActualizados.departamento_1,
        'departamento_1'
      );
      const departamento1Existe = DepartamentosService.getAll().some(
        (departamento) =>
          departamento.numeroDepartamento ===
            datosActualizados.departamento_1.clave &&
          departamento.nombre === datosActualizados.departamento_1.nombre
      );
      if (!departamento1Existe) {
        throw new Error('El departamento_1 no existe');
      }
      empleadoExistente.departamento_1 = datosActualizados.departamento_1;
    }

    if (datosActualizados.departamento_2) {
      this.validarDepartamento(
        datosActualizados.departamento_2,
        'departamento_2'
      );
      const departamento2Existe = DepartamentosService.getAll().some(
        (departamento) =>
          departamento.numeroDepartamento ===
            datosActualizados.departamento_2.clave &&
          departamento.nombre === datosActualizados.departamento_2.nombre
      );
      if (!departamento2Existe) {
        throw new Error('El departamento_2 no existe');
      }
      empleadoExistente.departamento_2 = datosActualizados.departamento_2;
    }

    if (datosActualizados.departamento_3) {
      this.validarDepartamento(
        datosActualizados.departamento_3,
        'departamento_3'
      );
      const departamento3Existe = DepartamentosService.getAll().some(
        (departamento) =>
          departamento.numeroDepartamento ===
            datosActualizados.departamento_3.clave &&
          departamento.nombre === datosActualizados.departamento_3.nombre
      );
      if (!departamento3Existe) {
        throw new Error('El departamento_3 no existe');
      }
      empleadoExistente.departamento_3 = datosActualizados.departamento_3;
    }

    // Actualizar otros datos del empleado si se proporcionan
    Object.assign(empleadoExistente, datosActualizados);

    this.empleados[empleadoIndex] = empleadoExistente;

    return empleadoExistente;
  }

  delete(id) {
    const empleadoEliminar = this.empleados.findIndex(
      (item) => item.numeroEmpleado == id
    );

    const departamentoService = require('../services/departamentoService');
    const departamentos = new departamentoService();
    if (empleadoEliminar !== -1) {
      this.empleados.splice(empleadoEliminar, 1);
      return empleadoEliminar;
    } else {
      return empleadoEliminar;
    }
  }
}
module.exports = empleadoService;
