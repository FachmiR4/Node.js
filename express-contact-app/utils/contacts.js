const { constants } = require('buffer');
const fs = require('fs');
const path = require('path');

// membuat folder data jika blom ada.
const dirPath = path.join(__dirname, 'data');
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
}

//membuat file contact.json jika blom ada
const dataPath = path.join(__dirname, 'data', 'contacts.json');
if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

// ambil semua data dicontact .json
const loadData = () => {
    const fileBuffer = fs.readFileSync(path.join(__dirname, 'data', 'contacts.json'), "utf-8");
    const contacts = JSON.parse(fileBuffer);
    return contacts;
}

const findContact = (nama) => {
    const contacts = loadData();
    const contact = contacts.find(contact => contact.nama.toLowerCase() === nama.toLowerCase());
    return contact; 
}

// menuliskan / menimpa file contacts.json dengan data yang baru 
const saveContact = (contacts) => {
    fs.writeFileSync('utils/data/contacts.json', JSON.stringify(contacts))
}

// manambahkan data contact baru
const addContact = (contact) => {
    const contacts = loadData();
    contacts.push(contact);
    saveContact(contacts)
}

// cek nama yang duplikat
const cekDuplikat = (nama) => {
    const contacts = loadData();
    return contacts.find(contact => contact.nama == nama);
}

module.exports = {loadData, findContact, addContact, cekDuplikat}