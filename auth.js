const http = require('http');
const fs = require('fs');

http.response.setHeader('Content-Type', 'text/plain');
http.response.end("test");