const db = require('../db');

exports.getOrdenesByUserId = async (userId) => {
    try {
        const ordenes = await db.query('SELECT * FROM orden WHERE usuarioId = $1', [userId]);
        if (ordenes.rows.length === 0) {
            return null;
        }
        return ordenes.rows;
    } catch (err) {
        console.error(err);
        throw new Error("Error al obtener las órdenes");
    }
};

exports.crearOrden = async (userId) => {
    try {    
        await db.query('INSERT INTO orden (fechaorden, horaorden, usuarioId) VALUES (CURRENT_DATE, CURRENT_TIME, $1)', [userId]);
    } catch (err) {
        console.error(err);
        throw new Error("Error al crear la orden");
    }
};

exports.addProductoAOrden = async (productoId, ordenId, cantidad) => {
    try {    
        await db.query('INSERT INTO ordenProducto (idorden, idproducto, cantidad) VALUES ($1, $2, $3)', [ordenId, productoId, cantidad]);
    } catch (err) {
        console.error(err);
        throw new Error("Error al agregar el producto a la orden");
    }
};
