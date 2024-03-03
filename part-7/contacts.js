const fs = require('fs');
const readline = require('readline');
const path = require('path');
const { json } = require('stream/consumers');
const { promises } = require('dns');
const { rejects } = require('assert');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// membuat folder data jika blom ada.
const dirPath = path.join(__dirname, 'data');
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
}

//membuat file contact.json jika blom ada
const dataPath = path.join(__dirname, 'data', 'contact.json');
if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

// membuat object promises
const pertanyaan = (pertanyaan) => {
    return new Promise((resolve, reject) => {
        rl.question(pertanyaan, (nama) => {
            resolve(nama);
        });
    });
}

const simpanContact = (nama, noHP, email) => {
    const contact = {nama, noHP, email};
    const fileBuffer = fs.readFileSync(path.join(__dirname, 'data', 'contact.json'), "utf-8");
    const contacts = JSON.parse(fileBuffer);
    contacts.push(contact);
    fs.writeFileSync(path.join(__dirname, "data", "contact.json"), JSON.stringify(contacts));

    console.log('terimakasih sudah memasukan data.');
    rl.close();
}

module.exports = {pertanyaan,simpanContact}