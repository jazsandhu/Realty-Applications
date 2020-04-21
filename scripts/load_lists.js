var $ = require('jquery');
var moment = require('moment');

//set contacts list
function set_contact_table() {
    $query = 'SELECT a.id, a.visits, a.first_name, a.last_name, a.phone_number, a.broker, b.appointment, b.meeting_with, a.project ' +
        'FROM realtygroup.contacts a ' +
        'LEFT JOIN (SELECT c.contact_id, d.appointment, d.meeting_with, c.timestamp ' +
        'FROM (SELECT contact_id, MAX(timestamp) timestamp ' +
        'FROM realtygroup.log_history ' +
        'GROUP BY contact_id) c ' +
        'JOIN realtygroup.log_history d ' +
        'ON c.contact_id = d.contact_id AND d.timestamp = c.timestamp) b ' +
        'ON a.id = b.contact_id ' +
        'ORDER BY b.appointment DESC, b.timestamp DESC';
    connection.query($query, function (err, rows) {
        if (err) throw err;
        console.log("Contact List:", rows);

        for (let i = 0; i <= rows.length; i++) {
            if (rows[i]) { //check if present cause index 0 doesnt exist
                if (rows[i].appointment == "Yes" || rows[i].appointment == "No") {
                    $("#tbody_content").append("<tr class='table-info call_contact_card' onclick='fill_contact_card(" + rows[i].id + ")'>" +
                        "<td>" + rows[i].visits + "</td>" +
                        "<td>" + rows[i].first_name + "</td>" +
                        "<td>" + rows[i].last_name + "</td>" +
                        "<td>" + rows[i].phone_number + "</td>" +
                        "<td>" + rows[i].broker + "</td>" +
                        "<td>" + rows[i].appointment + "</td>" +
                        "<td>" + rows[i].meeting_with + "</td>" +
                        "<td>" + rows[i].project + "</td>" +
                        "</tr>");
                }
                else {
                    $("#tbody_content").append("<tr class='call_contact_card' onclick='fill_contact_card(" + rows[i].id + ")'>" +
                        "<td>" + rows[i].visits + "</td>" +
                        "<td>" + rows[i].first_name + "</td>" +
                        "<td>" + rows[i].last_name + "</td>" +
                        "<td>" + rows[i].phone_number + "</td>" +
                        "<td>" + rows[i].broker + "</td>" +
                        "<td>" + rows[i].appointment + "</td>" +
                        "<td>" + rows[i].meeting_with + "</td>" +
                        "<td>" + rows[i].project + "</td>" +
                        "</tr>");
                }
            }
        }
    });
}

//set hot list
function set_hot_list_table() {
    $query = 'SELECT * FROM `contacts` WHERE lead_temperature IS NOT NULL ORDER BY lead_temperature DESC';
    connection.query($query, function (err, rows) {
        if (err) throw err;
        console.log("Hot List:", rows);

        for (let i = 0; i <= rows.length; i++) {
            if (rows[i]) {
                $("#tbody_hot_list").append("<tr class='call_contact_card' onclick='fill_contact_card(" + rows[i].id + ")'>" +
                    "<td>" + rows[i].lead_temperature + "</td>" +
                    "<td>" + rows[i].visits + "</td>" +
                    "<td>" + rows[i].first_name + "</td>" +
                    "<td>" + rows[i].last_name + "</td>" +
                    "<td>" + rows[i].phone_number + "</td>" +
                    "<td>" + moment(rows[i].time_of_registration).format('LL') + "</td>" +
                    "<td>" + rows[i].project + "</td>" +
                    "<td>" + rows[i].lead_source + "</td>" +
                    "</tr>");
            }
        }
    });
}