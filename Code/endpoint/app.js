var express = require('express'); // Web Framework
var app = express();
var sql = require('mssql'); // MS Sql Server client
const { request } = require('http');

// Connection string parameters.
var sqlConfig = {
    user: 'ypleungaa',
    password: '@Bonbonissmart',
    server: 'anthonyucl.database.windows.net',
    database: 'ucldissert'
}

// Start server and listen on azure or local
const port = process.env.PORT || 2000; // for runung on both azure and local debugging port
var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port

    console.log("app listening at http://%s:%s", host, port)
});

app.get('/sensor', function (req, res) {
    sql.connect(sqlConfig, function() {
        var request = new sql.Request();
        request.query('SELECT * FROM dbo.sensor', function(err, recordset) {
            if(err) console.log(err);
            res.end(JSON.stringify(recordset)); // Result in JSON format
        });
    });
    
})