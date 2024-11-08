const express = require('express');
const router = express.Router();
const ordenController = require('../controllers/ordenController');

//api/orden
router.get('/user/:userId', ordenController.getUserOrdenes);
router.post('/:userId', ordenController.crearOrden);
router.get('/:ordenId', ordenController.getOrdenById);
router.post('/producto', ordenController.addProductoAOrden);

module.exports = router;