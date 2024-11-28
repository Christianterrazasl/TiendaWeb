const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

//api/usuario
router.post('/login', usuarioController.login);
router.post('/register', usuarioController.register);
router.post('/registerAdmin', usuarioController.registerAdmin);
router.get('/admins', usuarioController.getAdmins);
router.delete('/administradores/:id', usuarioController.eliminarAdmin);
router.get('/carrito/:userId', usuarioController.getCarrito);
router.post('/carrito/anon', usuarioController.addCarritoAnon);
router.post('/carrito/producto', usuarioController.addProductoACarrito);
router.delete('/carrito/:userId', usuarioController.vaciarCarrito);
router.delete('/carrito/producto/', usuarioController.eliminarProductoDeCarrito)
router.post('/orden', usuarioController.addOrden);
router.get('/orden/:id',usuarioController.getOrdenesByUserId)
router.get('/allOrdenes', usuarioController.getAllOrdenes);



module.exports = router;