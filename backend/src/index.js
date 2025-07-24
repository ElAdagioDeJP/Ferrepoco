require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('API Ferrepoco funcionando');
});

// TODO: Agregar rutas de API

app.listen(port, () => {
  console.log(`Servidor escuchando en puerto ${port}`);
});
