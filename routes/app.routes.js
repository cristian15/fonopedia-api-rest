const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.status(200).jsonp({
        ok: true,
        mensaje: 'Peticion ok'
    });
});

module.exports = app;