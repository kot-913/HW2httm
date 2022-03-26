 const http = require('http');
 const fs = require('fs');
 const path = require('path');

const server = http.createServer((req,res) => {
res.writeHead(200, {
'Content-Type': 'text/html',
});

let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);

const extension = path.extname(filePath);
if(!extension){
    filePath+='.html';
}

fs.readFile(filePath, (err, result) => {
    if (err){
        fs.readFile(path.join(__dirname, 'public', 'error.html'), (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Something went wrong!');
            } else {
                res.writeHead(200, {
                    'Content-Type': 'text/html',
                })
                res.end(data);
            }
        })
    } else {
        res.writeHead(200, {
            'Content-Type': 'text/html',
        })
        res.end(result);
    }
});
 });

 const PORT = process.env.PORT || 3000;

 server.listen(PORT, () => {
console.log(`It is alive...check out port ${PORT}`);
 });