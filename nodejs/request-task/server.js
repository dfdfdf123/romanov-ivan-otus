const http = require('http');
const host = '127.0.0.1';
const port = 8080;

const server = http.createServer((req, res) => {
  setTimeout(() => {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hi');
  }, 100);
});

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});
