const express = require('express')
const expressLayout = require('express-ejs-layouts');
const app = express()
const port = 3000
// root = /
// route = /about

// gunakan ejs
app.set('view engine', 'ejs');
app.use(expressLayout);

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
    res.render('contact', {
      layout: 'layout/main-layout',
      title: 'Halaman Contact'
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