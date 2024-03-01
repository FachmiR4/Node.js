const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const fs = require('fs');
const fsPromise = require('fs').promises;
const path = require('path');
const { log } = require('console');

const logEvent = async (massage) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${massage}\n`;
    console.log(logItem);
    try{
        if(!fs.existsSync(path.join(__dirname, "logs"))){
            await fsPromise.mkdir(path.join(__dirname,'logs'));
        }
        // testing
        await fsPromise.appendFile(path.join(__dirname, "logs", 'eventLog.txt'), logItem);
    }catch(err){
        console.error(err);
    }
}

module.exports = logEvent;