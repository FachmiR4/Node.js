function cetakNama(nama){
    console.log(`hallo, nama saya ${nama}`);
}

const PI = 3.14;

class Orang{
    constructor(){
        console.log('object orang telah dibuat')
    }
}


module.exports.cetakNama = cetakNama;
module.exports.PI = PI;
module.exports.Orang = Orang;

// module.exports = {
//     cetakNama : cetakNama,
//     PI: PI,
//     Orang: Orang
// }

// module.exports = {cetakNama, PI, Orang}