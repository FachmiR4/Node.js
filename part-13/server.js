const express = require('express');
const app = express();
const path =  require("path");
const logEvent = require('./middleware/logEvent');
const PORT = process.env.PORT || 3500;

// custom middleware logger
app.use((req, res, next) => {
    logEvent(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqlog.txt');
    console.log(`${req.method} ${req.path}`);
    next();
});

// built-in middleware to handle urlencoded data
// in other words, form data:
// 'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({extended: false}));

// built-in middleware for json
app.use(express.json());

// serve static filter
app.use(express.static(path.join(__dirname, '/public')));

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