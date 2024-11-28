const productoRepo = require('../repositories/productoRepo');

exports.getAllProductos = async (req, res)=>{
    try{
        const result = await productoRepo.getAllProductos();
        return res.json(result);
    }
    catch(err){
        return res.status(500).send("Error al obtener productos");
    }
}


exports.getProductoById = async (req, res)=>{
    try{
        const producto = await productoRepo.getProductoById(req.params.index);
        return res.json(producto);
    }
    catch(err){
        return res.status(500).send("Error al obtener producto");
    }

}

exports.getCategorias = async (req, res)=>{
    try{
        const respuesta = await productoRepo.getCategorias();
        return res.json(respuesta);
    }catch(err){
        return res.status(404).send("Error al obtener categorias");
    }
}

exports.addCategoria = async (req,res)=>{
    try{
        const nombreCategoria = req.body.nombre;
        const respuesta = await productoRepo.addCategoria(nombreCategoria);
        return res.status(200).json(nombreCategoria);
    }catch(err){
        return res.status(501).send("Error al añadir categoria");
    }
}

exports.deleteCategoria = async (req,res)=>{
    try{
        const idCategoria = req.params.id;
        const respuesta = await productoRepo.deleteCategoria(idCategoria);
        return res.status(200).json(idCategoria);
    }catch(err){
        return res.status(501).send("Error al eliminar categoria");
    }
}

exports.deleteProducto = async (req, res)=>{
    try{
        const idProducto = req.params.id;
        const respuesta = await productoRepo.deleteCategoria(idProducto);
        return res.status(200).json(idProducto);
    }catch(err){
        return res.status(501).send("Error al eliminar producto");
    }
}