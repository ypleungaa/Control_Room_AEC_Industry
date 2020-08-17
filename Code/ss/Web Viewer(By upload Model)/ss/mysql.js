#!/usr/bin/env node

//  FlickrData API Server
//  Author:  Steven Gray
//  Description:  This FlickrAPI server allows users to connect to the Flickr Database and return values to explore on a mpa
//                for Workshop 8 - 9 of the course.
//  Notes:        This API assumes you have an SQL function called DISTANCE defined which can be created by running the following query in MySQL:

//  CREATE FUNCTION distance(a POINT, b POINT) RETURNS double DETERMINISTIC RETURN ifnull(acos(sin(X(a)) * sin(X(b)) + cos(X(a)) * cos(X(b)) * cos(Y(b) - Y(a))) * 6380, 0)

var moment = require('moment');

var portNumber = 8707;

var mysql = require('mysql');

// MySQL Connection Variables
var connection = mysql.createConnection({
  host     : 'dev.spatialdatacapture.org',
  user     : 'ucfnyle',
  password : 'wehomihiga',
  database : 'ucfnyle'
});

connection.connect();

//  Setup the Express Server
var express = require('express');
var app = express();
app.set('view engine', 'ejs');

// Provides the static folders we have added in the project to the web server.
app.use(express.static(__dirname + '/js'));
app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/images'));

// Default API Endpoint - return the index.ejs file in the views folder
app.get('/', function(req, res) {
    return res.render('index');
})

// API EndPOint to get data from date
app.get('/date', function (req, res) {
var d = new Date();
console.log(d);
});

//  Test API EndPoint to get data from airbnb price data
app.get('/data/airbnb_borough', function (req, res) {

    // Alows data to be downloaded from the server with security concerns
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-WithD");
    // If all the variables are provided connect to the database


    // Parse the values from the URL into numbers for the query


    // SQL Statement to run
    var sql = "SELECT * FROM airbnb_borough";

    // Log it on the screen for debugging
    console.log(sql);

    // Run the SQL Query
    connection.query(sql, function (err, rows, fields) {
        if (err) console.log("Err:" + err);
        if (rows != undefined) {
            // If we have data that comes bag send it to the user.
            res.send(rows);
        } else {
            res.send("");
        }
    });

    // If all the URL variables are not passed send an empty string to the user
});


//  Test API EndPoint to get data from airbnb data

app.get('/data/airbnb_data', function (req, res) {

    // Alows data to be downloaded from the server with security concerns
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-WithD");
    // If all the variables are provided connect to the database


    // Parse the values from the URL into numbers for the query


    // SQL Statement to run
    var sql = "SELECT * FROM airbnb_data";

    // Log it on the screen for debugging
    console.log(sql);

    // Run the SQL Query
    connection.query(sql, function (err, rows, fields) {
        if (err) console.log("Err:" + err);
        if (rows != undefined) {
            // If we have data that comes bag send it to the user.
            res.send(rows);
        } else {
            res.send("");
        }
    });

    // If all the URL variables are not passed send an empty string to the user
});

//  Test API EndPoint to get data from airbnb data

app.get('/data/airbnb_cluster', function (req, res) {

    // Alows data to be downloaded from the server with security concerns
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-WithD");
    // If all the variables are provided connect to the database


    // Parse the values from the URL into numbers for the query


    // SQL Statement to run
    var sql = "SELECT * FROM airbnb_cluster";

    // Log it on the screen for debugging
    console.log(sql);

    // Run the SQL Query
    connection.query(sql, function (err, rows, fields) {
        if (err) console.log("Err:" + err);
        if (rows != undefined) {
            // If we have data that comes bag send it to the user.
            res.send(rows);
        } else {
            res.send("");
        }
    });

    // If all the URL variables are not passed send an empty string to the user
});

//  Test API EndPoint to get data from GEO_TEST

app.get('/data/sa_summary', function (req, res) {

    // Alows data to be downloaded from the server with security concerns
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-WithD");
    // If all the variables are provided connect to the database


    // Parse the values from the URL into numbers for the query


    // SQL Statement to run
    var sql = "SELECT * FROM sa_summary";

    // Log it on the screen for debugging
    console.log(sql);

    // Run the SQL Query
    connection.query(sql, function (err, rows, fields) {
        if (err) console.log("Err:" + err);
        if (rows != undefined) {
            // If we have data that comes bag send it to the user.
            res.send(rows);
        } else {
            res.send("");
        }
    });

    // If all the URL variables are not passed send an empty string to the user
});


//  Test API EndPoint to get data from airbnb_point data
app.get('/data/airbnb_point', function (req, res) {

    // Alows data to be downloaded from the server with security concerns
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-WithD");
    // If all the variables are provided connect to the database


    // Parse the values from the URL into numbers for the query


    // SQL Statement to run
    var sql = "SELECT * FROM ucfnyle.airbnb_point";

    // Log it on the screen for debugging
    console.log(sql);

    // Run the SQL Query
    connection.query(sql, function (err, rows, fields) {
        if (err) console.log("Err:" + err);
        if (rows != undefined) {
            // If we have data that comes bag send it to the user.
            res.send(rows);
        } else {
            res.send("");
        }
    });

    // If all the URL variables are not passed send an empty string to the user
});

//  Test API EndPoint to get data from airbnb price data
app.get('/data/airbnb_price', function (req, res) {

    // Alows data to be downloaded from the server with security concerns
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-WithD");
    // If all the variables are provided connect to the database


    // Parse the values from the URL into numbers for the query


    // SQL Statement to run
    var sql = "SELECT * FROM airbnb_price";

    // Log it on the screen for debugging
    console.log(sql);

    // Run the SQL Query
    connection.query(sql, function (err, rows, fields) {
        if (err) console.log("Err:" + err);
        if (rows != undefined) {
            // If we have data that comes bag send it to the user.
            res.send(rows);
        } else {
            res.send("");
        }
    });

    // If all the URL variables are not passed send an empty string to the user
});

//  Test API EndPoint to get data from pubs_yelp data
app.get('/data/pubs_yelp', function (req, res) {

    // Alows data to be downloaded from the server with security concerns
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-WithD");
    // If all the variables are provided connect to the database


    // Parse the values from the URL into numbers for the query


    // SQL Statement to run
    var sql = "SELECT * FROM pubs_yelp";

    // Log it on the screen for debugging
    console.log(sql);

    // Run the SQL Query
    connection.query(sql, function (err, rows, fields) {
        if (err) console.log("Err:" + err);
        if (rows != undefined) {
            // If we have data that comes bag send it to the user.
            res.send(rows);
        } else {
            res.send("");
        }
    });

    // If all the URL variables are not passed send an empty string to the user
});

//  API EndPoint to get data from specific area - /data/51.1/0.0/30 
app.get('/data/:lat/:lon/:radius', function (req, res) {

      // Alows data to be downloaded from the server with security concerns
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-WithD");
      // If all the variables are provided connect to the database
      if(req.params.lat != "" && req.params.lon != "" && req.params.radius != ""){
               
                // Parse the values from the URL into numbers for the query
                var lat = parseFloat(req.params.lat);
                var lon = parseFloat(req.params.lon);
                var radius = parseFloat(req.params.radius);


                // SQL Statement to run
                var sql = "SELECT * FROM photo_locations WHERE DISTANCE(points, POINT("+lon+","+lat+") ) <= " + radius;
                
                // Log it on the screen for debugging
                console.log(sql);

                // Run the SQL Query
                connection.query(sql, function(err, rows, fields) {
                        if (err) console.log("Err:" + err);
                        if(rows != undefined){
                                // If we have data that comes bag send it to the user.
                                res.send(rows);
                        }else{
                                res.send("");
                        }
                });
        }else{
                // If all the URL variables are not passed send an empty string to the user
                res.send("");
        }
});

// API Endpoint to get data for specific photograph from database - /data/photoDescription/1234567
app.get('/data/photoDescription/:pid', function (req, res) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-WithD");
      if(req.params.pid != ""){
                var pid = parseInt(req.params.pid);
            
                var sql = "SELECT * FROM metadata as a INNER JOIN photos as b ON a.pid = b.pid where a.pid = " + pid; 

                console.log(sql);
                connection.query(sql, function(err, rows, fields) {
                        if (err) console.log("Err:" + err);
                        if(rows != undefined){
                                res.send(rows);
                        }else{
                                res.send("");
                        }
                });
        }else{
                res.send("");
        }
});

// Setup the server and print a string to the screen when server is ready
var server = app.listen(portNumber, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
});

function mysql_real_escape_string (str) {
    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
        switch (char) {
            case "\0":
                return "\\0";
            case "\x08":
                return "\\b";
            case "\x09":
                return "\\t";
            case "\x1a":
                return "\\z";
            case "\n":
                return "\\n";
            case "\r":
                return "\\r";
            case "\"":
            case "'":
            case "\\":
            case "%":
                return "\\"+char; // prepends a backslash to backslash, percent,
                                  // and double/single quotes
        }
    });
}
