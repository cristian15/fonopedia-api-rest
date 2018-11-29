/* Para enviar emails  */

let express = require('express');
let mdVerificaToken = require('../middlewares/auth');

let app = express();

const nodemailer = require('nodemailer');

app.post('/',(req, res) => {
    console.log(req.body)
    const mailTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'fonopedia.uct@gmail.com',
            pass: 'fonopedia.1234',
        },
    });
    const mailOptions = {
        from: `Fonopedia UCT <fonopedia.uct@gmail.com>`,
        to:             req.body.para,
        subject:        req.body.asunto,
        text:           req.body.contenido
    };
    // The user subscribed to the newsletter.
    return mailTransport.sendMail(mailOptions).then(() => {
        console.log('Email enviado a:', req.body.para);
        return res.status(200).jsonp({respuesta: 'Email enviado..'});
    });
});

module.exports = app;