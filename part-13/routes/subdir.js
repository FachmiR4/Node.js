const express = require('express');
const routes = express.Router();
const path = require('path');

routes.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'view', 'subdir', 'index.html'));
});
routes.get('/test(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'view', 'subdir', 'test.html'));
});

module.exports = routes;