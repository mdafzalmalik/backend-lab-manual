const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {

    if (req.url === '/') {

        const filePath = path.join(__dirname, 'index.html');

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end("Server Error");
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });

    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end("404 - Page Not Found");
    }
});

server.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});