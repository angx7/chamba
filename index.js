const express = require('express');
const routerApi = require('./routes/routes');
const app = express();
const port = 3000;

app.use(express.json());

routerApi(app);

app.get('/', (req, res) => {
  res.send('Hola mi servidor en Express');
});

app.listen(port, () => {
  console.log('My port is working on: ' + port);
});
