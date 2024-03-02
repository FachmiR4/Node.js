// core module
// core modul adalah modul yang sudah disediakan oleh node js 
const { copyFileSync } = require('fs')

//local module 
// local modul adalah yang kita buat sendiri dari fungsi
const test = require('./text')

console.log(test.cetakNama('fachmi Ramadhan'), test.PI, new test.Orang);

//third party modul / npm modulu / node_module
// third party modul adalah yang disediakan oleh komunita node js


