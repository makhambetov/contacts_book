const http = require('http');
const fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db.sqlite');

const hostname = '';
const port = 80;

const server = http.createServer() 



server.on ('request', function(req, res){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');

    fs.exists('.' + req.url, (exists) => 
    {
        if (exists && req.url != '/') 
        {
            fs.readFile('.' + req.url, function(err, data) {
                res.end(data);
            })
        } 

        else 
        {
            if (req.url == '/contacts')
                res.end('Contacts page')


            else if(req.url == '/updDB'){
                var data2 = '';
                req.on('data', function(chunk){
                    data2 += chunk.toString();
                })
                req.on('end', function() {
                    //console.log(data2);
                    db.serialize(function () {
                        db.run("UPDATE contacts SET data = '" + data2 + "'");
                        //console.log('Data base updated');
                    });
                    //response.write('');
                    //response.end();
                });
            }

            else if(req.url == '/readDB'){
                req.on('data', function() {
                    db.serialize(function () {
                        db.each("SELECT data FROM contacts", function(err, row) {
                            data = row.data;
                            //console.log('DB loaded');
                            //console.log('Data: ' + row.data);
                            res.write(row.data);
                            res.end();
                        })
                        
                    });
                });
            }

            else if(req.url == '/updPage'){
                //console.log('upd request');
                var data3 = '';
                req.on('data', function(chunk) {
                    data3 += chunk.toString();
                    //console.log("data: " + data3);
                });
                
                req.on('end', function() {
                    //console.log("data: " + data3);
                    res.write(data3);
                    res.end();
                });
            }


            else
                fs.readFile('index.html', function(err, data) {
                    console.log('body request');
                    res.end(data);
                })
        }
    });



});


server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

