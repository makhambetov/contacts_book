var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db.sqlite');

db.serialize(function() {
    db.run("CREATE TABLE contacts (data TEXT)");
    db.run("INSERT INTO contacts (data) VALUES('')")
    /*db.each("SELECT msg, user FROM message", function(err, row) {
        console.log(row.user + ": " + row.msg);
    });*/
});

db.close();