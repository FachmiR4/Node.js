// core module
// module http
const http = require('http');

// untuk membuat server
const server = http.createServer((req, res)=> {
    // untuk mengecek url http://localhost:3000/img
    const url = req.url;
    console.log(url);
    // res.write('heloo world');
    // Mengirimkan header respons ke permintaan. Kode status adalah kode status HTTP
    res.writeHead(200, {
        'Content-Type': 'application/json',
    })

    // Metode ini memberi sinyal ke server bahwa semua header dan isi respons telah dikirim; 
    // server itu harus menganggap pesan ini selesai.
    res.end(JSON.stringify({
        data: 'hello world',
    }));
})

//untuk membuat port pada server
server.listen(3000, () => {
    console.log('server is listener on port 3000..')
})