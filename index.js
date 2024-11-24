const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

const usuarioRouter = require('./routes/usuarioRouter');
const productoRouter = require('./routes/productoRouter');


app.use('/api/usuario', usuarioRouter);
app.use('/api/producto', productoRouter);

app.listen(process.env.PORT || 3000, ()=> console.log("Server running on port 3000"));
