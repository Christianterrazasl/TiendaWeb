const db = require('../db');

exports.getUsuarioByUsername = async (username)=>{
    try{
        const result = await db.query('select * from usuario where username = $1', [username]);
        if (result.rows.length === 0){ return null;}
        return result.rows[0];
    }
    catch(err){
        console.error(err);

    }
}

exports.register = async(usuario)=>{
    try{
        
        const resultado = await db.query('insert into usuario (nombre, username, contrasena) values ($1, $2, $3) returning id',[usuario.nombre, usuario.username, usuario.contrasena]);
        return resultado.rows[0].id;
    }
    catch(err){
        console.error(err);
    }
}

exports.getUsuarioById = async (idUser)=>{
    try{
        const result = await db.query('select * from usuario where id = $1', [idUser]);
        if (result.rows.length === 0){ return null;}
        return result.rows[0];
    }
    catch(err){
        console.error(err);

    }
}