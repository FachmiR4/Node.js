const fsPromise = require('fs').promises; //modul yang memungkinkan dengan sistem file
const path = require('path');


const fileOps = async () => {
    try{
        const data = await fsPromise.readFile(path.join(__dirname, 'files', 'stater.txt'), 'utf8');
        console.log(data);
        await fsPromise.unlink(path.join(__dirname, 'files', 'stater.txt'), 'utf8');
        await fsPromise.writeFile(path.join(__dirname, 'files', 'promiseWriter.txt'), data);
        await fsPromise.appendFile(path.join(__dirname, 'files', 'promiseWriter.txt'), "\n\nhow are you?..bro");
        await fsPromise.rename(path.join(__dirname, 'files', 'promiseWriter.txt'), path.join(__dirname, 'files', 'promiseComplete.txt'));
        const newData = await fsPromise.readFile(path.join(__dirname, 'files', 'promiseComplete.txt'), 'utf8');
        console.log(newData);
    }
    catch(err){
        console.error(err);
    }
}

fileOps();

// .toString()
// fs.readFile("./files/stater.txt", "utf8",(err, data) => {
//     if(err) throw err;
//     console.log(data);
// })


/* 
// untuk membaca file yang ada
fs.readFile(path.join(__dirname, 'files', 'stater.txt'), "utf8",(err, data) => {
    if(err) throw err;
    console.log(data);
})
// menulis ulang atau membuat file baru
fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), 'nice to meet you  ',(err) => {
    if(err) throw err;
    console.log('write complete');

    fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), 'Fachmi Ramadhan',(err) => {
        if(err) throw err;
        console.log('append complete');

        fs.rename(path.join(__dirname, 'files', 'reply.txt'), path.join(__dirname, 'files', 'newReply.txt'),(err) => {
            if(err) throw err;
            console.log('rename complete');
        })
    })

})
// menambahkan text atau membuat file baru
fs.appendFile(path.join(__dirname, 'files', 'text.txt'), 'myname is januardi',(err) => {
    if(err) throw err;
    console.log('append complete');
})

// menghapus file 
fs.unlink(path.join(__dirname, 'files', 'stater.txt'), "utf8", (err) ={
    if (err) => throw err;
    console.log('delete complete')
})
*/

// console.log('Hello...')

// exit on uncaught errors
process.on('uncaughtException', err => {
    console.error(`There was an uncaught error: ${err}`);
    process.exit(1);
})