const express = require('express')
const app = express()
const port = 3000
// root = /
// route = /about

app.get('/', (req, res) => {
  res.send('Hello World!')
})
// res = apa yang dikembalikan oleh express
// req = apa yang dikirimkan ke express
app.get('/about', (req, res) => {
    // res.send('ini page About')
    res.sendFile('./index.html', {root: __dirname})
})
app.get('/product/:id', function (req, res) {
    res.send(`Product id: ${req.params.id} <br> Catagory: ${req.query.catagory}`)
  })

//use = digunakan untuk menjalakna middleware
app.use('/',(req, res)=>{
    res.status(404)
    res.send('<h1>404</h1>')
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})