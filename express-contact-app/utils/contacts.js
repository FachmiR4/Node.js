const fs = require('fs');
const path = require('path');

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

// ambil semua data dicontact .json
const loadData = () => {
    const fileBuffer = fs.readFileSync(path.join(__dirname, 'data', 'contact.json'), "utf-8");
    const contacts = JSON.parse(fileBuffer);
    return contacts;
}

const findContact = (nama) => {
    const contacts = loadData();
    const contact = contacts.find(contact => contact.nama.toLowerCase() === nama.toLowerCase());
    return contact; 
}

module.exports = {loadData, findContact}