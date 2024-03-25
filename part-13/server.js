const express = require('express');
const app = express();
const path =  require("path");
const PORT = process.env.PORT || 3500;

app.get('^/$|/index(.html)?', (req, res) => {
    // res.sendFile('./view/index.html', {root: __dirname});
    res.sendFile(path.join(__dirname, 'view', 'index.html'));
});
app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, '/index.html'); // 302 by default
});

// Route handlers
app.get('/hello(.html)?', (req, res, next) => {
    console.log("percobaan");
    next();
}, (req, res) => {
    res.send("heloo world");
});

app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, "view", '404.html'));
});
app.listen(PORT, () => console.log(`server running on port ${PORT}`))