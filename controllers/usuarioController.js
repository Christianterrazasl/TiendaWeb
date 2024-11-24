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
