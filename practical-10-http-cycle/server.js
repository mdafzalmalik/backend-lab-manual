const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {

    // Parse URL
    const parsedUrl = url.parse(req.url, true);

    // Extract details
    const method = req.method;
    const requestUrl = req.url;
    const headers = req.headers;
    const query = parsedUrl.query;

    console.log("Request Method:", method);
    console.log("Request URL:", requestUrl);
    console.log("Headers:", headers);
    console.log("Query Parameters:", query);

    res.writeHead(200, { 'Content-Type': 'application/json' });

    // Custom response based on method
    if (method === 'GET') {
        res.end(JSON.stringify({
            message: "GET request received",
            query: query
        }));
    } 
    else if (method === 'POST') {
        res.end(JSON.stringify({
            message: "POST request received"
        }));
    } 
    else {
        res.end(JSON.stringify({
            message: "Other request received"
        }));
    }
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});