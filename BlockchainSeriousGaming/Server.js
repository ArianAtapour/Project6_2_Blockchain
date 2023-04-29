const http = require('http');
const fs = require('fs')

const hostname = '127.0.0.1';
const port = 3000;

fs.readFile('./index.html', function(error, html) {
    if(error) throw error;
    http.createServer(function(request, response) {
        response.writeHeader(200, {"Content-Type": "text/html"});
        response.write(html);
        response.end();
    }).listen(port)
});

// server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
// });