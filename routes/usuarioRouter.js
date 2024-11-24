const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

//api/usuario
router.post('/login', usuarioController.login);
router.post('/register', usuarioController.register);
//router.get('/carrito/:userId', usuarioController.getCarrito);

module.exports = router;