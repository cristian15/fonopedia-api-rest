let express = require('express');

let fileUpload = require('express-fileupload');
let fs = require('fs');
let path = require('path');


let app = express();
let mdVerificaToken = require('../middlewares/auth');


// default options
app.use(fileUpload());

// let pathUpload = './uploads/';
let pathUpload = path.resolve(__dirname, '../uploads') + '/';


app.post('/:item/:id', mdVerificaToken.verificaToken, (req, res) => {


    let usuario = req.usuario;
    let archivos = [];

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No selecciono nada',
            errors: { message: 'Debe de seleccionar un archivo' }
        });
    }

    Object.keys(req.files).forEach(file => {
        // Obtener nombre del archivo
        let archivo = req.files[file];
        let nombreCortado = archivo.name.split('.');
        let extensionArchivo = nombreCortado[nombreCortado.length - 1].toLowerCase();

        // Sólo estas extensiones aceptamos
        let extensionesValidas = ['png', 'jpg', 'jpeg', 'gif', 'jpeg', 'wav', 'mp3', 'ogg'];

        if (extensionesValidas.indexOf(extensionArchivo) < 0) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Extension no válida',
                errors: { message: 'El archivo '+ archivo.name +' no es de tipo valido. Las tipos válidos son ' + extensionesValidas.join(', ') }
            });
        }

        let nombreArchivo = `${ nombreCortado[0] }.${ usuario._id }-${ new Date().getTime() }.${ extensionArchivo }`;
        archivos.push(nombreArchivo);

        // crea directorio
        let path = pathUpload+ req.params.item+ '/' + req.params.id+ '/' + nombreArchivo;

        try {
            fs.mkdirSync(pathUpload+ req.params.item);
            
        } catch (err) {
            if (err.code !== 'EEXIST') throw err
        }
        try {
            fs.mkdirSync(pathUpload+ req.params.item + '/' + req.params.id);
            
        } catch (err) {
            if (err.code !== 'EEXIST') throw err
        }
          
        // Mover el archivo del temporal a un path
        archivo.mv(path, err => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al mover archivo',
                    errors: err
                });
            }
        });
    });
    
    return res.status(200).json({
        ok: true,
        mensaje: 'Archivo(s) subido con exito',
        archivos: archivos
    })

});

app.delete('/:item/:id/:archivo', mdVerificaToken.verificaToken, (req, res) => {

    let archivo = req.params.archivo;

    if (fs.existsSync(pathUpload + req.params.item+ '/' + req.params.id + '/' + archivo)) {
        fs.unlinkSync(pathUpload + req.params.item+ '/' + req.params.id + '/' + archivo);
        return res.status(200).json({
            ok: true,
            mensaje: 'Archivo Eliminado',
        })
    } else {
        return res.status(400).json({
            ok: false,
            mensaje: 'Archivo no existe',
            errors: { message: 'Archivo no existe' }
        });
    }
});


app.get('/:item/:id/:archivo', (req, res) => {
    let archivo = req.params.archivo;
    let nombreSplit = archivo.split('.');
    let extencion = nombreSplit[nombreSplit.length -1];
    let nombreArchivo = `${nombreSplit[0]}.${extencion}`;
    let extencionImagenes = ['png', 'jpg', 'jpeg', 'gif', 'jpeg'];

    let ruta = pathUpload+ '/' + req.params.item + '/' + req.params.id+ '/' + archivo;
    if (fs.existsSync(ruta)) {
        if (extencionImagenes.indexOf(extencion) < 0) {
            res.download(ruta, nombreArchivo);
        } else {
            res.sendFile(ruta);
        }
    } else {
        if (extencionImagenes.indexOf(extencion) < 0) {
            res.status(400).json({
                ok: false,
                mensaje: 'Archivo no existe',
                errors: { message: 'Archivo no existe' }
            });
        } else {
            res.sendFile(path.resolve('assets/no_photo.png'));
        }
    }

});
module.exports = app;