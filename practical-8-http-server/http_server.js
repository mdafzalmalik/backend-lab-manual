const http = require('http');

// Creating server
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Afzal, your Node.js HTTP server is running successfully.');
});

const PORT = 8080;

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});