var $ = require('jquery');
var mysql = require('mysql');
const { ipcMain: ipc } = require('electron');

$(document).ready(function () {
    $('#jquery_check').hide();

    //star rating
    $('input').rating({
        filled: 'glyphicon glyphicon-heart',
        empty: 'glyphicon glyphicon-heart-empty'
    });

    $('.callContactCard').click(function () {
        $('#exampleModal').modal('show')
    });
});


// Add the credentials to access your database
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "442918",
    database: "realtygroup"
});

// connect to mysql
connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

// Perform a query
$query = 'SELECT * FROM `contacts` LIMIT 10';
connection.query($query, function (err, rows, fields) {
    if (err) throw err;
    console.log("Query succesfully executed", rows);
});