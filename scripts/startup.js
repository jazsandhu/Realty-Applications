var $ = require('jquery');
var mysql = require('mysql');

//add the credentials to access your database
var connection = mysql.createPool({
    host: "localhost",
    user: "root",
    port: 3306,
    password: "442918",
    database: "realtygroup",
    connectionLimit : 10,               // this is the max number of connections before your pool starts waiting for a release
    multipleStatements : true           // I like this because it helps prevent nested sql statements, it can be buggy though, so be careful
});

//connect to mysql
connection.getConnection(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

$(document).ready(function () {
});