var $ = require('jquery');
var mysql = require('mysql');
var moment = require('moment');

$(document).ready(function () {
    //set table rows
    set_contact_table();
    set_hot_list_table();

    //single select checkboxes
    $('input[type="checkbox"]').on('change', function () {
        $('input[name="' + this.name + '"]').not(this).prop('checked', false);
    });
});

//fill contact modal
function fill_contact_card(id) {
    //$('#contact_card').modal('show');
    $('#contact_card').load('contact_card.html', function () {
        $('#contact_card').modal('show');
    });
    $('a[href="#nav_home"]').tab('show');

    $query = 'SELECT * FROM `contacts` WHERE id=' + id;
    connection.query($query, function (err, rows) {
        if (err) throw err;
        console.log("Select ID Modal", rows);

        //fill modal
        $("#contact_card").ready(function () {

            //lead temperature
            if (!rows[0].lead_temperature) {
                $('#fire3C').replaceWith('<i id="fire3C"></i>');
                $('#fire2C').replaceWith('<i id="fire2C"></i>');
                $('#fire1C').replaceWith('<i id="fire1C"></i>');
                $('#lead_temperature_caption').replaceWith('<i id="lead_temperature_caption"></i>');
            }
            else if (rows[0].lead_temperature == 0) {
                $('#fire3C').replaceWith('<i style="color:LightGray" id="fire3C" class="fas fa-fire-alt fa-lg"></i>');
                $('#fire2C').replaceWith('<i style="color:LightGray" id="fire2C" class="fas fa-fire-alt fa-lg"></i>');
                $('#fire1C').replaceWith('<i style="color:LightGray" id="fire1C" class="fas fa-fire-alt fa-lg"></i>');
                $('#lead_temperature_caption').replaceWith('<i id="lead_temperature_caption">Not Interested</i>');
            }
            else if (rows[0].lead_temperature == 1) {
                $('#fire3C').replaceWith('<i style="color:LightGray" id="fire3C" class="fas fa-fire-alt fa-lg"></i>');
                $('#fire2C').replaceWith('<i style="color:LightGray" id="fire2C" class="fas fa-fire-alt fa-lg"></i>');
                $('#fire1C').replaceWith('<i style="color:red" id="fire1C" class="fas fa-fire-alt fa-lg"></i>');
                $('#lead_temperature_caption').replaceWith('<i id="lead_temperature_caption">Requesting Details</i>');
            }
            else if (rows[0].lead_temperature == 2) {
                $('#fire3C').replaceWith('<i style="color:LightGray" id="fire3C" class="fas fa-fire-alt fa-lg"></i>');
                $('#fire2C').replaceWith('<i style="color:red" id="fire2C" class="fas fa-fire-alt fa-lg"></i>');
                $('#fire1C').replaceWith('<i style="color:red" id="fire1C" class="fas fa-fire-alt fa-lg"></i>');
                $('#lead_temperature_caption').replaceWith('<i id="lead_temperature_caption">Interested but Not Sure</i>');
            }
            else if (rows[0].lead_temperature == 3) {
                $('#fire3C').replaceWith('<i style="color:red" id="fire3C" class="fas fa-fire-alt fa-lg"></i>');
                $('#fire2C').replaceWith('<i style="color:red" id="fire2C" class="fas fa-fire-alt fa-lg"></i>');
                $('#fire1C').replaceWith('<i style="color:red" id="fire1C" class="fas fa-fire-alt fa-lg"></i>');
                $('#lead_temperature_caption').replaceWith('<i id="lead_temperature_caption">Ready to Go</i>');
            }

            //broker status
            if (rows[0].broker == 'Yes') {
                $('#broker_cc').replaceWith('<h5 id="broker_cc" class="text-left"><span class="badge badge-danger">Broker</span></h5>');
            }
            else {
                $('#broker_cc').replaceWith('<h5 id="broker_cc" class="text-left"><span class="badge badge-success">Client</span></h5>');
            }

            //visits
            $('#visits_cc').replaceWith('<h5 id="visits_cc" class="text-right"><span class="badge badge-info">' + rows[0].visits + ' Visits</span></h5>');

            //first name
            $('#first_name_cc').replaceWith('<span id="first_name_cc">' + rows[0].first_name + ' </span>');

            //last name
            $('#last_name_cc').replaceWith('<span id="last_name_cc">' + rows[0].last_name + ' </span>');

            //phone number
            $('#phone_number_cc').replaceWith('<span id="phone_number_cc">' + rows[0].phone_number + ' </span>');

            //show broker fields if broker/otherwise hide
            if (rows[0].broker == 'Yes') {
                $('.broker_info').show();
                $('.client_info').hide();
            }
            else {
                $('.broker_info').hide();
                $('.client_info').show();
            }

            //brokerage name
            $('#brokerage_name_cc').replaceWith('<span id="brokerage_name_cc">' + rows[0].brokerage_name + ' </span>');

            //office phone number
            $('#office_phone_number_cc').replaceWith('<span id="office_phone_number_cc">' + rows[0].office_phone_number + ' </span>');

            //client comment with latest pending + present comment
            $('#agent_client_comment_cc').replaceWith('<textarea class="form-control" id="agent_client_comment_cc" rows="3" readonly>' + rows[0].contact_text + '</textarea>');

            //client comment with latest pending + present comment
            $('#registration_date_cc').replaceWith('<small id="registration_date_cc">Registered: ' + moment(rows[0].time_of_registration).format('LL') + '</small>');
        });
    });
}