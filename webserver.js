/**
 * require('http') : http라는 부품(module)이 필요하다
 * const 선언으로 인해 http 상수에 항상 가지고 있고 변하지 않음
 */
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
