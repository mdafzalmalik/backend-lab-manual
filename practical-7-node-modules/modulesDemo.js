// Importing built-in modules
const os = require('os');
const path = require('path');
const url = require('url');

// OS Module
console.log("Operating System Platform:", os.platform());
console.log("CPU Architecture:", os.arch());
console.log("Total Memory:", os.totalmem());
console.log("Free Memory:", os.freemem());

// Path Module
const filePath = path.join(__dirname, 'example.txt');
console.log("Joined File Path:", filePath);
console.log("File Extension:", path.extname(filePath));

// URL Module
const myUrl = new url.URL('https://example.com:8000/about?name=afzal&course=backend');

console.log("Host:", myUrl.host);
console.log("Pathname:", myUrl.pathname);
console.log("Query Parameters:", myUrl.searchParams.get('name'));