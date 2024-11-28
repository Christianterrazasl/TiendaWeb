const db = require('../db');

const getImagenById = async (id) => {

    const connection = await getConnection();

    const [rows] = await db.query('SELECT * FROM imagen WHERE imagenId = $1', [id]);

    if (rows.length === 0) {
        return null;
    }

    return rows[0];
}

const createImagen = async (imagen) => {

    const { fileName, path } = imagen;
    const temporal = 1;
    const fechaSubida = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const data = [fileName, path, temporal, fechaSubida];
    const imagenId = await db.query('INSERT INTO imagen (fileName, path, temporal, fechaSubida) values ($1,$2,$3,$4) returning id', data);

    return imagenId;
}

module.exports = {
    getImagenById,
    createImagen
};