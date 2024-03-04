const fs = require('fs');
const path = require('path');
const validator = require('validator');



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

const loadContact = () => {
    const fileBuffer = fs.readFileSync(path.join(__dirname, 'data', 'contact.json'), "utf-8");
    const contacts = JSON.parse(fileBuffer);
    return contacts;
}

const simpanContact = (nama, email, noHP) => {
    const contact = {nama, email,  noHP,};
    // const fileBuffer = fs.readFileSync(path.join(__dirname, 'data', 'contact.json'), "utf-8");
    // const contacts = JSON.parse(fileBuffer);

    const contacts = loadContact();

    // cek duplikat
    const duplikat = contacts.find((contact)=> contact.nama === nama);
    if(duplikat){
        console.log('Contact sudah terdaftar, gunakan nama lain');
        return false;
    }

    // cek email
    if(email){
        if(!validator.isEmail(email)){
            console.log('Email tidak valid!');
            return false;
        }
    }
    if(noHP){
        if(!validator.isMobilePhone(noHP, 'id-ID')){
            console.log('Nomor Handphone tidak valid!');
            return false;
        }
    }
    contacts.push(contact);
    fs.writeFileSync(path.join(__dirname, "data", "contact.json"), JSON.stringify(contacts));

    console.log('terimakasih sudah memasukan data.');
}

const listContact = () => {
    const  contacts = loadContact();
    console.log('Daftar kontak:')
    contacts.forEach((contact, i) => {
        console.log(`${i + 1}. ${contact.nama} - ${contact.noHP}`)        
    });
}

const detailContact = (nama) => {
    const contacts = loadContact();
    const contact = contacts.find((contact) => 
    contact.nama.toLowerCase() === nama.toLowerCase());
    if(!contact){
        console.log(`${nama} tidak ditemukan!`);
        return false;
    }
    console.log(contact.nama);
    console.log(contact.noHP);
    if(contact.email){
        console.log(contact.email);
    }

}

const deleteContact = (nama) => {
    const contacts = loadContact();
    const newContact = contacts.filter((contact) => 
    contact.nama.toLowerCase() !== nama.toLowerCase());
    if(contacts.length === newContact.length){
        console.log(`${nama} tidak ditemukan`)
        return false;
    }
    fs.writeFileSync(path.join(__dirname, "data", "contact.json"), JSON.stringify(newContact));
    console.log('data sudah dihapus!');
}

module.exports = {listContact, simpanContact, detailContact, deleteContact}