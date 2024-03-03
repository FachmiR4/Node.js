// menggunakan object destructuring
const { emit } = require('process');
const {pertanyaan, simpanContact} = require('./contacts')

// const pertanyaan2 = () => {
//     return new Promise((resolve, reject) => {
//         rl.question('masukan no hp anda: ', (noHp) => {
//             resolve(noHp);
//         });
//     });
// }
// const pertanyaan3 = () => {
//     return new Promise((resolve, reject)=> {
//         rl.question('masukan email anda: ', (email) => {
//             resolve(email);
//         });
//     });
// }

const main = async () => {
    const nama = await pertanyaan('masukan nama anda: ');
    const noHP = await pertanyaan('masukan no hp anda: ');
    const email = await pertanyaan('masukan email anda:');
    simpanContact(nama, noHP, email);
}

main();


// rl.question('masukan nama anda: ', (nama)=> {
//     rl.question('masukan nomor anda: ', (noHP) => {
//         const contact = {nama, noHP};
//         const fileBuffer = fs.readFileSync(path.join(__dirname, 'data', 'contact.json'), "utf-8");
//         const contacts = JSON.parse(fileBuffer);
//         contacts.push(contact);
//         fs.writeFileSync(path.join(__dirname, "data", "contact.json"), JSON.stringify(contacts));

//         console.log('terimakasih sudah memasukan data.');
//         rl.close();
//     })
// })