const http = require('http');

const server = http.createServer((req, res) => {

    const url = req.url;

    switch (url) {

        case '/':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end("Welcome to the Home Page");
            break;

        case '/home':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end("This is the Home route");
            break;

        case '/login':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end("This is the Login route");
            break;

        case '/data':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end("This is the Data route");
            break;

        default:
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end("404 - Page Not Found");
    }
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});