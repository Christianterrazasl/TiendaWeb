const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

// GET api/producto/ 
router.get('/', productoController.getAllProductos);
router.get('/productoId/:index', productoController.getProductoById);
router.get('/categoria', productoController.getCategorias);
router.post('/categoria', productoController.addCategoria);
router.delete('/categoria/:id', productoController.deleteCategoria);
router.delete('/:id', productoController.deleteProducto);
//router.get('/categoria/:index', productoController.getProductosByCategoria);
//router.get('/marca/', productoController.getMarcas);
//router.get('/marca/:index', productoController.getProductosNyMarca);

module.exports = router;