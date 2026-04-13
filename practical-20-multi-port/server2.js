const http = require('http');

const PORT = process.env.PORT2 || 5000;

const server = http.createServer((req, res) => {
    res.end(`Server 2 running on port ${PORT}`);
});

server.listen(PORT, () => {
    console.log(`Server 2 started on http://localhost:${PORT}`);
});