const express = require('express');
const router = express.Router();
const {nombreEmpleado} = require('../lib/empleadosLib');
const {departamentos} = require('../lib/departamentosLib');
module.exports = router;

const empleados = [];

function traducirGenero(genero) {
  switch (genero) {
    case 'female':
      return 'femenino';
    case 'male':
      return 'masculino';
    default:
      return 'género no especificado';
  }
}

function crearEmpleado() {
  for (let index = 0; index < 20; index++) {
    const [departamentosAleatorios] = seleccionarDepartamentosAleatorios(departamentos);
    let genero = Math.random() < 0.5 ? 'female' : 'male';
    let generoTraducido = traducirGenero(genero);

}
empleados.push({
  numeroEmpleado: faker.number.int({ max: 10000 }),
  nombreEmpleado: faker.person.firstName(genero),
  edad: Math.floor(Math.random() * 10) + 18,
  genero: generoTraducido,
  departamento_1: departamentosAleatorios[0],
  departamento_2: departamentosAleatorios[1],
  departamento_3: departamentosAleatorios[2],
});
}

function seleccionarDepartamentosAleatorios(departamentos) {
  const seleccionados = [];
  const claveDepartamento = [];
  while (seleccionados.length < 3) {
    const indiceAleatorio = Math.floor(Math.random() * departamentos.length);
    const departamentoSeleccionado = departamentos[indiceAleatorio];
    if (!seleccionados.includes(departamentoSeleccionado)) {
      claveDepartamento.push(indiceAleatorio + 1);
      seleccionados.push(departamentoSeleccionado);
    }
  }
  return [seleccionados, claveDepartamento];
}

crearEmpleado();

router.get('/', (req, res) => {
  const { numeroEmpleado } = req.query;
  if (numeroEmpleado) {
    const nEmpleado = empleados.find(
      (empleados) => empleados.numeroEmpleado === parseInt(numeroEmpleado)
    );
    if (!nEmpleado) {
      return res.status(400).json({ message: 'No se encontro el empleado' });
    }
    return res.json(nEmpleado);
  }
  res.json(empleados);
});



router.post('/', (req, res) => {
  const nuevoEmpleado = req.body; 
  const existe = empleados.find(
    (empleados) => empleados.numeroEmpleado === nuevoEmpleado.numeroEmpleado
  );
  if (existe) {
    return res
      .status(400)
      .json({ message: 'El numero de Empleado que quieres, ya existe' });
  }
  empleados.push(nuevoEmpleado);
  res.json({ message: 'El empleado ha sido agregado',nuevoEmpleado: nuevoEmpleado });
});
