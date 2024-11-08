const db = require('../db');

exports.addProducto = async ( idCarrito, idProducto, cantidad)=>{
    try{
        await db.query('insert into carritoproducto (idCarrito, idProducto, cantidad) values ($1, $2, $3)',[idCarrito, idProducto, cantidad]);

    }catch(err){
        console.error(err);
    }
}



exports.getProductos = async (idCarrito) => {
    try{
        const productos = await  db.query('select * from carritoproducto where idcarrito = $1', [idCarrito]);
        if (productos.rows.length ===0){return null};
        return productos.rows;
    }catch(err){
        console.error(err);
    }
}

exports.vaciarCarrito = async (idCarrito) => {
    try{
        await db.query('delete from carritoproducto where idcarrito = $1', [idCarrito]);

    }catch(err){
        console.error(err);
    }
}

exports.crearCarrito = async (idUser)=> {
    try{
        await db.query('insert into carrito (fecha, hora, userId) values (CURRENT_DATE, CURRENT_TIME, $1)', [idUser]);

    }catch(err){
        console.error(err);
    }
}

exports.getCarritoByUserId = async (idUser) => {
    try{
        const carritoResultado = await  db.query('select * from carrito where userId = $1', [idUser]);
        if (carritoResultado.rows.length === 0 ){return null};
        return productos.rows;
    }catch(err){
        console.error(err);
    }

}