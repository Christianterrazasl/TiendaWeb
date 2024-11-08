const usuarioRepo = require('../repositories/usuarioRepo');
const carritoRepo = require('../repositories/carritoRepo');

exports.login = async (req, res) => {
    try {
        const { nombre, contrasena } = req.body;
        const user = await usuarioRepo.getUsuarioByNombre(nombre);
        
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
        const {nombre, email, contrasena} = req.body;
        await usuarioRepo.register(nombre, email, contrasena);
        
        const user = await usuarioRepo.getUsuarioByNombre(nombre);
        if (user && user.id) {
            await carritoRepo.crearCarrito(user.id);
            return res.status(201).send(`Usuario ${nombre} registrado y carrito creado.`);
        } else {
            return res.status(500).send('Error al obtener usuario después de registro');
        }

        
    }
    catch(err){
        return res.status(500).send('Creacion de usuario fallo');
    }
};
