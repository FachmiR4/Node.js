// mengambil argumen dari command line
// node app fachmi ramadhan
// const command = process.argv[2]
// if (commamd == 'add') {}

const contacts = require('./contacts');
const yargs = require('yargs');

// console.log(yargs.argv);

yargs.command({
    command: 'add',
    describe: "menambahkan contact baru",
    builder: {
        nama:{
            describe: 'nama lengkap',
            demandOption: true,
            type: 'string',
        },
        email:{
            describe:"email",
            demandOption:false,
            type: 'string',
        },
        noHp:{
            describe:"Nomor Handphone",
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv){
        contacts.simpanContact(argv.nama, argv.email, argv.noHp);
     }
}).demandCommand();

//menampilkan daftar semua nama & noHp contact
yargs.command({
    command: 'list',
    describe: 'Manampilkan semua nama & no HP contaks',
    handler(){
        contacts.listContact();
    }
});

// manampilkan nama berdasarkan nama contact
yargs.command({
    command: 'detail',
    describe: 'menampilkan data berdasarkan nama',
    builder: {
        nama:{
            describe: 'nama lengkap',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv){
        contacts.detailContact(argv.nama);
    }
})

// menghapus data bedasarkan nama
yargs.command({
    command: 'delete',
    describe: 'menghapus data berdasarkan nama',
    builder: {
        nama:{
            describe: 'nama lengkap',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv){
        contacts.deleteContact(argv.nama);
    }
})


// untuk mengambil data
yargs.parse();



// option 1 code
// yargs.command(
//     'add',
//     'menambahkan contact baru',
//     () => {},
//     (argv) => {
//         console.log(argv.nama);
//     }
// );
