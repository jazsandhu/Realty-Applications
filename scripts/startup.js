var $ = require('jquery');
var mysql = require('mysql');

//add the credentials to access your database
var connection = mysql.createPool({
    host: "localhost",
    user: "root",
    port: 3306,
    password: "----",
    database: "----",
    connectionLimit : 10,
    multipleStatements : true
});

//connect to mysql
connection.getConnection(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

$(document).ready(function () {
});
