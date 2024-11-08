const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carritoController');

//api/carrito/

router.post('/', carritoController.addProducto);
router.get('/:idCarrito', carritoController.getProductos);
router.delete('/:idCarrito', carritoController.vaciarCarrito);
router.post('/:idUser', carritoController.crearCarrito);

module.exports = router;

