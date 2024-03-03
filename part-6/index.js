// core module
// core modul adalah modul yang sudah disediakan oleh node js 
const { error } = require('console');
const fs = require('fs')
const path = require('path');
const readline = require('readline');
const { json } = require('stream/consumers');
// fs.writeFile('test.txt', "helooo, fachmi!", (e) => {
//     console.log(e);
// });
// const data = fs.readFile('test.txt', 'utf-8', (err, data) => {
//     console.error(err);
//     console.log(data);
// });

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// menambahkan file json baru di local
rl.question('masukan nama anda?', (nama) => {
   rl.question('masukan nomor hp anda?', (noHp) => {

        const contact = [{nama, noHp}];
        const contacts = fs.writeFileSync('contact.json', JSON.stringify(contact));
        console.log('terimakasih dauha memasukan data anda')
    rl.close();
   })
})


//local module 
// local modul adalah yang kita buat sendiri dari fungsi
// const test = require('./text')

// console.log(test.cetakNama('fachmi Ramadhan'), test.PI, new test.Orang);

//third party modul / npm modulu / node_module
// third party modul adalah yang disediakan oleh komunita node js

