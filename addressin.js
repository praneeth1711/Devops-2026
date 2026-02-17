const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const query = parsedUrl.query;

    const name = query.name || "No name provided";
    const age = query.age || "No age provided";

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write(`Name: ${name}\n`);
    res.write(`Age: ${age}`);
    res.end();
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000/");
});
