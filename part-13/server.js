const express = require('express');
const app = express();
const path =  require("path");
const cors = require('cors')
const { logger } = require('./middleware/logEvent');
const errorHandler  = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;

// custom middleware logger
app.use(logger);

// cross origins resource sharing
const whitelist = ['https://www.google.com', "http://127.0.0.1:5500", "http://localhost:3500"];
const corsOptions = {
    origin: (origin, callback) => {
        if(whitelist.indexOf(origin) !== -1 || !origin){
            callback(null, true);
        }else{
            callback(new Error('Not allowed by CORS'));
        }
    },
}
app.use(cors(corsOptions));

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

app.all('/*', (req, res) => {
    res.status(404);
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, "view", '404.html'));
    }else if(req.accepts('json')){
        res.json({error: "404 Not Found"});
    }else {
        res.type('txt').send('404 Not Found');
    }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`server running on port ${PORT}`))