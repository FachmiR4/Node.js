
const logEvent = require('./logEvent');

const EventEmitter = require('events');

class myEmitter extends EventEmitter {};

//initialize object
const myEmitte = new myEmitter();

myEmitte.on('log', (msg) => logEvent(msg));

setTimeout(() => {
    // emit event
    myEmitte.emit("log", "Log event emitted!");
}, 2000);