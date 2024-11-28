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

exports.registerAdmin = async(usuario)=>{
    try{
        
        const resultado = await db.query('insert into usuario (nombre, username, contrasena, esadmin) values ($1, $2, $3, true) returning id',[usuario.nombre, usuario.username, usuario.contrasena]);
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
        return null;

    }
}

exports.getAdmins = async ()=>{
    try{
        const result = await db.query('select id, username from usuario where esadmin = true');
        if (result.rows.length === 0){ return null;}
        return result.rows;
    }
    catch(err){
        console.error(err);
        return null;

    }
}



exports.getCarritoByUserId = async (userId)=>{
    try{
        const carrito = await db.query("select p.nombre as nombreproducto, p.precio , cantidad, u.username, p.id as idproducto, u.id as idusuario from carritoproducto c join producto p on p.id = c.idproducto join usuario u on u.id = c.idusuario where u.id = $1",[userId]);
        
        return carrito.rows;
    
    }catch(err){
        console.error(err);
        return null;
    }

} 

//addcarritoanon

exports.addCarritoAnon = async (carrito)=>{
    try{
        for(item of carrito){
            const result = await db.query("insert into carritoproducto(idusuario, idproducto, cantidad) values($1,$2,$3)", [item.idusuario, item.idproducto, item.cantidad]);
            
        }
        return carrito;
    }catch(err){
        console.error(err);
        return null;
    }
}
//addproductoacarrito
exports.addProductoACarrito = async (producto)=>{
    try{
        
        const result = await db.query("insert into carritoproducto(idusuario, idproducto, cantidad) values($1,$2,$3)", [producto.idusuario, producto.idproducto, producto.cantidad]);    
        if(result){
            return producto;
        }
    }catch(err){
        console.error(err);
        return null;
    }
}

exports.vaciarCarrito = async (userId)=>{
    try{
        
        const result = await db.query("delete from carritoproducto where idusuario = $1", [userId]);    
        if(result){
            return true;
        }
    }catch(err){
        console.error(err);
        return null;
    }
}

exports.crearOrden = async (orden)=>{
    try{
        
        const ordenResult = await db.query('insert into orden (fechaorden, horaorden,usuarioid) values (current_date, current_time, $1) returning id', [orden[0].idusuario]);
        const idOrden = ordenResult.rows[0].id;
        for(item of orden){
            const resultado = await db.query('insert into ordenproducto (idorden, idproducto, cantidad) values ($1,$2,$3)', [idOrden, item.idproducto, item.cantidad]);
        }
        return orden;
    }catch(err){
        console.error(err);
        return null;
    }
}

exports.getOrdenesByUserId = async (userid)=>{
    try{
        result = await db.query ('select o.id as idorden, o.fechaorden, o.horaorden, o.fechaentrega, o.horaentrega, p.nombre, p.precio, op.cantidad from orden o join ordenproducto op on op.idorden = o.id join producto p on p.id = op.idproducto where o.usuarioid = $1;', [userid]);
        if(result){return result.rows;}

    }catch(err){
        console.error(err);
        return null;
    }
}

exports.getAllOrdenes = async ()=>{
    try{
        
        result = await db.query ('select o.id as idorden, o.fechaorden,u.username, o.horaorden, o.fechaentrega, o.horaentrega, p.nombre, p.precio, op.cantidad from orden o join ordenproducto op on op.idorden = o.id join producto p on p.id = op.idproducto join usuario u on u.id = o.usuarioid ');
        if(result){return result.rows;}

    }catch(err){
        console.error(err);
        return null;
    }
}

exports.eliminarProductoDeCarrito = async (idusuario, idProducto)=>{
    try{
        
        const result = await db.query("delete from carritoproducto where idusuario = $1 and idproducto = $2", [idusuario, idProducto]);    
        if(result){
            return true;
        }
    }catch(err){
        console.error(err);
        return null;
    }
}
exports.eliminarAdmin = async (adminId)=>{
    try{
        
        const result = await db.query("update usuario set esadmin = false where id = $1", [adminId]);    
        if(result){
            return true;
        }
    }catch(err){
        console.error(err);
        return null;
    }
}