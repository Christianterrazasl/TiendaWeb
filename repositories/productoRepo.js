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
        result = await db.query('select * from producto where id = $1', [id]);
        if (result.rows.length === 0){return null};
        return result.rows[0];
    }
    catch(err){
        console.error(err);
    }
}