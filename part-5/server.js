const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromise = require('fs').promises;

const logEvent = require('./logEvent');
const EventEmitter = require('events');
const { text, json } = require('stream/consumers');
class myEmitter extends EventEmitter {};


//initialize object
const myEmitte = new myEmitter();
myEmitte.on('log', (msg, fileName)=> logEvent(msg, fileName))
const PORT = process.env.PORT || 3000;

const serveFile = async (filePath, contentType, respone) => {
    try{
        const rawData = await fsPromise.readFile(filePath, !contentType.includes('image') ? 'utf8': '');
        const data = contentType === 'application/json'? JSON.parse(rawData) : rawData;
        respone.writeHead(200, {'Content-Type': contentType});
        respone.end(
            contentType === 'application/json' ? JSON.stringify(data) : data
        );
    }catch(err){
        console.log(err);
        myEmitte.emit('log', `${err.name}: ${err.message}`, 'errLog.txt');
        respone.statusCode = 500;
        respone.end();
    }
}

const server = http.createServer((req, res) => {
    console.log(req.url, req.method)
    myEmitte.emit('log', `${req.url}\t${req.method}`, 'reqLog.txt');
    
    const extension = path.extname(req.url);

    let contentType;

    switch(extension){
        case '.css':
            contentType = "text/css";
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.json':
            contentType = "appliaction/json";
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.txt':
            contentType = 'text/plain';
            break;
        default:
            contentType = 'text/html';
    }

    let filePath = contentType === 'text/html' && req.url === "/" 
                    ? path.join(__dirname, 'views', 'index.html')
                    : contentType === 'text/html' && req.url.slice(-1) === '/'
                    ? path.join(__dirname, 'views', req.url, 'index.html')
                    : contentType === "text/html"
                    ? path.join(__dirname, 'views', req.url)
                    : path.join(__dirname, req.url);

    // makes .html extension not required in the browser
    if(!extension && req.url.slice(-1) !== '/') filePath += '.html';

    const fileExists = fs.existsSync(filePath);

    if(fileExists){
        //serve the file
        serveFile(filePath, contentType, res);
    }else{
        //404
        //301 redirect
        switch(path.parse(filePath).base){
            case 'old-page.html':
                res.writeHead(301, {'loaction': '/new-page.html'});
                break;
            case 'www-page.html':
                res.writeHead(301,{'location': '/'});
                res.end();
                break;
            default:
                //serve a 404 respone
                serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res);
        }
    }
   
});

server.listen(PORT, () => console.log(`server running on port ${PORT}`));

// myEmitte.on('log', (msg) => logEvent(msg));
// myEmitte.emit("log", "Log event emitted!");

// if(req.url === '/' || req.url === 'index.html'){
//     res.statusCode = 200;
//     res.setHeader('Content-Type', "text/html");
//     path = path.join(__dirname, 'view', 'index.html');
//     fs.readFile(path, 'utf8', (err, data)=> {
//         res.end(data);
//     })
// }