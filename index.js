const express = require('express');
const routerApi = require('./routes/routes');
const setupSwagger = require('./swagger');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

mongoose
  .connect(
    'mongodb+srv://kuri:WpeUpIni6FllIRbu@chamba.cloey.mongodb.net/?retryWrites=true&w=majority&appName=chamba',
  )
  .then(() => console.log('Conexión a MongoDB Exitosa'))
  .catch((err) => console.log('No se pudo conectar a MongoDB', err));

routerApi(app);
setupSwagger(app);

app.get('/', (req, res) => {
  res.send('Hola mi servidor en Express');
});

app.listen(port, () => {
  console.log('My port is working on: ' + port);
});

// mongodb+srv://kuri:<db_password>@chamba.cloey.mongodb.net/
