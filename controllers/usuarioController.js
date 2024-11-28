const usuarioRepo = require('../repositories/usuarioRepo');

exports.login = async (req, res) => {
    try {
        const { username, contrasena } = req.body;
        const user = await usuarioRepo.getUsuarioByUsername(username);
        
        
        if (!user) {
            return res.status(401).send('Nombre o contraseña incorrectos');
        }
        if (user.contrasena !== contrasena) {
            return res.status(401).send('Nombre o contraseña incorrectos');
        }
        delete user.contrasena;
        return res.json(user);
    } catch (err) {
        console.error(err);
        
        if (!res.headersSent) {
            return res.status(500).send('Error al obtener usuario');
        }
    }
};

exports.register = async (req, res)=>{
    try{
        const usuario = req.body;
        const usernameDuplicado = await usuarioRepo.getUsuarioByUsername(usuario.username);
        if(usernameDuplicado){
            return res.status(400).send('Username ya esta en uso');

        }
        const respuesta = await usuarioRepo.register(usuario);
        if(!respuesta){
            return res.status(500).send('Error al insertar usuario');
        }
        const usuarioObtenido = await usuarioRepo.getUsuarioByUsername(usuario.username);
        if(usuarioObtenido){
            delete usuarioObtenido.contrasena;
            return res.json(usuarioObtenido);
        }
        return res.status(201)
    }
    catch(err){
        return res.status(500).send('Creacion de usuario fallida');
    }
};


exports.registerAdmin = async (req, res)=>{
    try{
        const usuario = req.body;
        const usernameDuplicado = await usuarioRepo.getUsuarioByUsername(usuario.username);
        if(usernameDuplicado){
            return res.status(400).send('Username ya esta en uso');

        }
        const respuesta = await usuarioRepo.registerAdmin(usuario);
        if(!respuesta){
            return res.status(500).send('Error al insertar usuario');
        }
        const usuarioObtenido = await usuarioRepo.getUsuarioByUsername(usuario.username);
        if(usuarioObtenido){
            delete usuarioObtenido.contrasena;
            return res.json(usuarioObtenido);
        }
        return res.status(201)
    }
    catch(err){
        return res.status(500).send('Creacion de usuario fallida');
    }
};

exports.getCarrito = async (req, res) => {
    try{
        const userId = req.params.userId;
        const carrito = await usuarioRepo.getCarritoByUserId(userId);
        
        return res.json(carrito);

    }catch(err){
        console.error(err);
        res.status(401).send("Error al obtener el carrito");
    }
}

//addcarritoanon
exports.addCarritoAnon = async(req, res)=>{
    try{
        const carrito = req.body;
        console.log(carrito);
        const result = await usuarioRepo.addCarritoAnon(carrito);
        if(result){
            return res.status(201).json(carrito);
        }
        return res.status(401).send('error al subir el carrito');
        
    }catch(err){
        console.err(err);
    }
}
//addproductoacarrito
exports.addProductoACarrito = async(req, res)=>{
    try{
        const producto = req.body;
        const result = await usuarioRepo.addProductoACarrito(producto);
        if(result){
            return res.status(201).json(producto);
        }
        return res.status(401).send('error al subir el producto');
        
    }catch(err){
        console.err(err);
    }
}

exports.vaciarCarrito = async(req, res)=> {
    try{
        const userId = req.params.userId;
        const response = await usuarioRepo.vaciarCarrito(userId);
        if(response){
            return res.status(200).send("Eliminados los productos del usuario: "+userId);
        }
    }catch(err){
        console.error(err);
        return res.status(401).send('Error al vaciar el carrito');
    }
}

exports.addOrden = async (req, res)=>{
    try{
        const orden = req.body;
        const response = await usuarioRepo.crearOrden(orden);
        if(response){
            return res.json(orden);
        }
    }catch(err){
        console.error(err);
        return res.status(401).send('Error al crear la orden');
    }
}

exports.getOrdenesByUserId = async(req, res)=>{
    try{
        const userid = req.params.id;
        const result = await usuarioRepo.getOrdenesByUserId(userid);
        if (result){
            return res.json(result);

        }
        return res.status(404).send('Error en la operacion');

    }catch(err){
        console.error(err);
        return res.status(404).send("Error al cargar ordenes");
    }
}

exports.getAllOrdenes = async (req,res)=>{
    try{
        
        const result = await usuarioRepo.getAllOrdenes();
        if (result){
            return res.json(result);

        }
        return res.status(404).send('Error en la operacion');

    }catch(err){
        console.error(err);
        return res.status(404).send("Error al cargar ordenes");
    }
}

exports.getAdmins = async (req,res)=>{
    try{
        
        const result = await usuarioRepo.getAdmins();
        if (result){
            return res.json(result);

        }
        return res.status(404).send('Error en la operacion');

    }catch(err){
        console.error(err);
        return res.status(404).send("Error al cargar admins");
    }
}

exports.eliminarProductoDeCarrito = async(req,res)=>{
    try{
        const{idusuario, idproducto} = req.body;
        const response = await usuarioRepo.eliminarProductoDeCarrito(idusuario, idproducto);
        if(response){
            return res.status(200).json(idproducto);
        }
    }catch(err){
        console.error(err);
        return res.status(401).send('Error al vaciar el carrito');
    }
}

exports.eliminarAdmin = async(req, res)=>{
    try{
        const adminId = req.params.id;
        console.log(adminId);
        const response = await usuarioRepo.eliminarAdmin(adminId);
        if(response){
            return res.status(200).json(adminId);
        }
    }catch(err){
        console.error(err);
        return res.status(401).send('Error al vaciar el carrito');
    }
}