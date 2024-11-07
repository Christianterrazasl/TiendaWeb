const db = require('../db');

exports.getUsuarioByNombre = async (nombre)=>{
    try{
        const result = await db.query('select * from cliente where nombre = $1', [nombre]);
        if (result.rows.length === 0){ return null;}
        return result.rows[0];
    }
    catch(err){
        console.error(err.message);

    }
}

exports.register = async(nombre, email, contrasena)=>{
    try{
        await db.query('insert into cliente (nombre, email, contrasena) values ($1, $2, $3)',[nombre, email, contrasena]);

    }
    catch(err){
        console.error(err);
    }
}