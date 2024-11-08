const ordenRepo = require('../repositories/ordenRepo');

exports.getUserOrdenes = async (req, res) => {
    try{
        const ordenes = await ordenRepo.getOrdenesByUserId(req.params.userId);
        return res.json(ordenes);
        
    }catch(err){
        return res.status(401).send("No se pudieron obtener ordenes");
    }
}

exports.crearOrden = async (req, res) => {
    try{
        const userId = req.params.userId;

        await ordenRepo.crearOrden(userId);
        res.status(201).send("orden creada");
        
    }catch(err){
        return res.status(401).send("No se pudo crear orden");
    }

}

exports.getOrdenById = async (req, res) => {
    try{
        const orden = await ordenRepo.getOrdenById(req.params.ordenId);
        return res.json(orden);
        
    }catch(err){
        return res.status(401).send("No se pudieron obtener ordenes");
    }
}

exports.addProductoAOrden = async (req, res) => {
    try {
        const { productoId, ordenId, cantidad } = req.body;
        
        if (!productoId || !ordenId || !cantidad) {
            return res.status(400).send("Faltan datos");
        }
        
        await ordenRepo.addProductoAOrden(productoId, ordenId, cantidad);
        
        return res.status(201).send(`Producto ${productoId} agregado correctamente a la orden ${ordenId}`);
    } catch (err) {
        console.error(err);
        return res.status(500).send("Error al agregar producto a la orden");
    }
};


