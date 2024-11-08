const carritoRepo = require('../repositories/carritoRepo');

//post
//api/carrito/:idProducto
exports.addProducto = async (req, res)=>{
    try{
        const idCarrito = req.body.idCarrito;
        const idProducto = req.body.idProducto;
        const cantidad = req.body.cantidad;
        if(!idCarrito || !cantidad || !idProducto){return res.status(400).send("Faltan datos");}
        await carritoRepo.addProducto(idCarrito, idProducto, cantidad);
        return res.status(201).send(`Producto ${idProducto} agregado correctamente`);
    }
    catch(err){
        return res.status(500).send("Error al agregar producto al carrito");
    }
}
//get
//api/carrito/:idCarrito
exports.getProductos = async (req, res) =>{
    try{
        const idCarrito = req.params.idCarrito;
        const productos = await carritoRepo.getProductos(idCarrito);
        return res.json(productos);
    }catch(err){
        return res.status(500).send("Error al obtener productos del carrito")
    }
}

//Delete
//api/carrito/:idCarrito
exports.vaciarCarrito = async(req, res) => {
    try{
        const idCarrito = req.params.idCarrito;
        await carritoRepo.vaciarCarrito(idCarrito);
        return res.status(200).send("Carrito vaciado");
    }catch(err){
        return res.status(500).send("Fallo al vaciar carrito");
    }
}
//Post
//api/carrito/:idUser
exports.crearCarrito = async (req, res) => {
    try{
        const idUser = req.params.idUser;
        await carritoRepo.crearCarrito(idUser);
        return res.status(201).send("Carrito creado con exito"); 
    }catch(err){
        return res.status(500).send("Fallo al crear carrito");
    }
}
