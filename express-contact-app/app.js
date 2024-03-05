const express = require('express')
const expressLayout = require('express-ejs-layouts');
const app = express();
const { loadData, findContact } = require('./utils/contacts')
const port = 3000
// root = /
// route = /about

// gunakan ejs
app.set('view engine', 'ejs');

// third-party middleware
app.use(expressLayout);
app.use(express.static('public'))


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
      contacts
    })
})


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