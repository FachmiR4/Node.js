const express = require('express')
const expressLayout = require('express-ejs-layouts');
const app = express();
const { loadData, findContact, addContact, cekDuplikat, deleteContact, updateContact} = require('./utils/contacts');
const { body, validationResult, check } = require('express-validator');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const port = 3000
// root = /
// route = /about

// gunakan ejs
app.set('view engine', 'ejs');

// third-party middleware
app.use(expressLayout);
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}))

// kon figurasi flash
app.use(cookieParser('secret'));
app.use(session({
  cookie: {maxAge: 6000},
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));
app.use(flash());


app.get('/', (req, res) => {
  const mahasiswa = [
    {
      nama: 'fachmi ramadhan',
      email: 'fachmi.F@gmail.com'
    },
    {
      nama: 'Dodi supradi',
      email: 'dodi.D@gmail.com'
    },
    {
      nama: 'jayadi parmanan',
      email: 'jayadi.J@gmail.com'
    }
  ]
  res.render('index', {
  nama: 'fachmi ramadhan', 
  title: 'ini halaman home',
  mahasiswa,
  layout: 'layout/main-layout'});
})

app.get('/about', (req, res) => {
    res.render('about', {
      layout: 'layout/main-layout',
      title: 'Halaman About'
    })
})
app.get('/contact', function (req, res) {
  const contacts = loadData();
    res.render('contact', {
      layout: 'layout/main-layout',
      title: 'Halaman Contact',
      contacts,
      msg: req.flash('msg')
    })
})


// halaman tambah data contact
app.get('/contact/add', (req, res) => {
  res.render('add-contact', {
    title: 'Form Tambah Data Contact',
    layout: 'layout/main-layout',
  })
})

//proses data
app.post('/contact', [
  body('nama').custom((value) => {
      const duplikat = cekDuplikat(value);
      if(duplikat){
        throw new Error('Nama contact sudah Digunakan');
      }
      return true;
  }),
  check('email', 'Email tidak valid!').isEmail(),
  check('noHP', 'No HP tidak valid!').isMobilePhone('id-ID'),
], (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    // return res.status(404).json({errors: errors.array()});
    res.render('add-contact', {
      title: 'Form Tambah Data Contact',
      layout: 'layout/main-layout',
      errors: errors.array()
    })
  }else{
     addContact(req.body);
    //  kirimkan flash message
    req.flash('msg', 'Data contact berhasil ditambahkan!')
    //mengarahkan file ke file ke yang lain
     res.redirect('/contact');
  }

})

// menghapus data
app.get('/contact/delete/:nama', (req, res) => {
  const contact = findContact(req.params.nama);
  // jika contact tidak ada 
   if(!contact){
    res.status(404);
    res.send('<h1>404</h1>')
  }else{
      deleteContact(req.params.nama);
      req.flash('msg', 'Data contact berhasil dihapus!')
      res.redirect('/contact');
  }
 
})
// mengedit data
app.get('/contact/edit/:nama', (req, res) => {
  const contact = findContact(req.params.nama);
  res.render('edit-contact', {
    title: 'Form Data Data Contact',
    layout: 'layout/main-layout',
    contact
  })
})

//proses ubah data 
app.post('/contact/update', [
  body('nama').custom((value, {req}) => {
      const duplikat = cekDuplikat(value);
      if(value !== req.body.oldNama && duplikat){
        throw new Error('Nama contact sudah Digunakan');
      }
      return true;
  }),
  check('email', 'Email tidak valid!').isEmail(),
  check('noHP', 'No HP tidak valid!').isMobilePhone('id-ID'),
], (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    // return res.status(404).json({errors: errors.array()});
    res.render('edit-contact', {
      title: 'Form Edit Data Contact',
      layout: 'layout/main-layout',
      errors: errors.array(),
      contact: req.body
    })
  }else{
     updateContact(req.body);
    // //  kirimkan flash message
     req.flash('msg', 'Data contact berhasil ditambahkan!')
    // //mengarahkan file ke file ke yang lain
     res.redirect('/contact');
  }

})

// halaman detail
app.get('/contact/:nama', function (req, res) {
  const contact = findContact(req.params.nama);
    res.render('detail', {
      title: 'Halaman Detail Contact',
      layout: 'layout/main-layout',
      contact
    })
})

//use = digunakan untuk menjalakna middleware
app.use('/',(req, res)=>{
    res.status(404)
    res.send('<h1>404</h1>')
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})