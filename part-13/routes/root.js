const express = require('express');
const routes = express.Router();
const path = require('path');

routes.get('^/$|/index(.html)?', (req, res) => {
    // res.sendFile('./view/index.html', {root: __dirname});
    res.sendFile(path.join(__dirname, '..','view', 'index.html'));
});
routes.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, '/index.html'); // 302 by default
});

// Route handlers
routes.get('/hello(.html)?', (req, res, next) => {
    console.log("percobaan");
    next();
}, (req, res) => {
    res.send("heloo world");
});

module.exports = routes;