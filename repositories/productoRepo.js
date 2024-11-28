const db = require('../db');

exports.getAllProductos = async ()=> {
    try{
        const result = await db.query('select * from producto');
        if (result.rows.length === 0){ return null;}
        return result.rows;
    }
    catch(err){
        console.error(err);

    }
}

exports.getProductoById = async (id)=>{
    try{
        result = await db.query('select p.*, m2.nombre as marca, c2.nombre as categoria from producto p join marcaproducto m on p.id = m.productoid join marcas m2 on m.marcaid = m2.id join categoriaproducto c on c.productoid = p.id join categorias c2 on c2.id = c.categoriaid where p.id = $1;', [id]);
        if (result.rows.length === 0){return null};
        return result.rows[0];
    }
    catch(err){
        console.error(err);
        return null;
    }
}

exports.getCategorias = async ()=>{
    try{
        result = await db.query('Select * from categorias');
        return result.rows;
    }
    catch(err){
        console.error(err);
        return null;
    }
}

exports.addCategoria = async (nombre)=>{
    try{
        result = await db.query('insert into categorias (nombre) values ($1)',[nombre]);
        return true;
    }
    catch(err){
        console.error(err);
        return null;
    }
}

exports.deleteCategoria = async (id)=>{
    try{
        result = await db.query('delete from categorias where id = $1',[id]);
        return true;
    }
    catch(err){
        console.error(err);
        return null;
    }
}

exports.deleteProducto = async (id)=>{
    try{
        result = await db.query('delete from producto where id = $1',[id]);
        return true;
    }
    catch(err){
        console.error(err);
        return null;
    }
}

