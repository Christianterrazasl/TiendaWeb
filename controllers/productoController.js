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