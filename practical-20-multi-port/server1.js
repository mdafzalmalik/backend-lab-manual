const http = require('http');

const PORT = process.env.PORT1 || 3000;

const server = http.createServer((req, res) => {
    res.end(`Server 1 running on port ${PORT}`);
});

server.listen(PORT, () => {
    console.log(`Server 1 started on http://localhost:${PORT}`);
});