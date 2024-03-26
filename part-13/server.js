const express = require('express');
const app = express();
const path =  require("path");
const cors = require('cors')
const { logger } = require('./middleware/logEvent');
const errorHandler  = require('./middleware/errorHandler');
const routes = require('./routes/subdir');
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

// routes
app.use('/', require('./routes/root'));
app.use('/subdir', require('./routes/subdir'));
app.use('/employees', require('./routes/api/employees'));


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