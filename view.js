let a = "hehe";

$(document).ready(function () {
    $('#jquery_check').hide();
});

function connectDB() {
    // establish mysql connection
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "442918",
        database: "realtygroup"
    });
    //connect to mysql
    con.connect(function (err) {
        if (err) throw err;
        console.log("Database Connected!");
    });

    var sql = "SELECT * FROM `contacts`";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
    });
}