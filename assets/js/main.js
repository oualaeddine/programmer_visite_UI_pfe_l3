/*!

 =========================================================
 * Paper Bootstrap Wizard - v1.0.2
 =========================================================

 * Product Page: https://www.creative-tim.com/product/paper-bootstrap-wizard
 * Copyright 2017 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/paper-bootstrap-wizard/blob/master/LICENSE.md)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */

// Paper Bootstrap Wizard Functions

searchVisible = 0;
transparent = true;


$(document).ready(function () {

    /*  Activate the tooltips      */
    $('[rel="tooltip"]').tooltip();

    // Code for the Validator
    var $validator = $('.wizard-card form').validate({
        rules: {
            nbrPieces: {
                required: true
            },
            nbrSdb: {
                required: true
            },
            nbrEtages: {
                required: true
            },
            region: {
                required: true
            }
        }
    });

    // Wizard Initialization
    $('.wizard-card').bootstrapWizard({
        'tabClass': 'nav nav-pills',
        'nextSelector': '.btn-next',
        'previousSelector': '.btn-previous',

        onNext: function (tab, navigation, index) {
            var $valid = $('.wizard-card form').valid();
            if (!$valid) {
                $validator.focusInvalid();
                return false;
            }
            if (index === 5) {
                fillDetails();
            }
        },

        onInit: function (tab, navigation, index) {

            //check number of tabs and fill the entire row
            var $total = navigation.find('li').length;
            $width = 100 / $total;

            navigation.find('li').css('width', $width + '%');

        },

        onTabClick: function (tab, navigation, index) {
            fillDetails();
            return $('.wizard-card form').valid();

        },

        onTabShow: function (tab, navigation, index) {
            var $total = navigation.find('li').length;
            var $current = index + 1;

            var $wizard = navigation.closest('.wizard-card');

            // If it's the last tab then hide the last button and show the finish instead
            if ($current >= $total) {
                $($wizard).find('.btn-next').hide();
                $($wizard).find('.btn-finish').show();
            } else {
                $($wizard).find('.btn-next').show();
                $($wizard).find('.btn-finish').hide();
            }

            //update progress
            var move_distance = 100 / $total;
            move_distance = move_distance * (index) + move_distance / 2;

            $wizard.find($('.progress-bar')).css({width: move_distance + '%'});
            //e.relatedTarget // previous tab

            $wizard.find($('.wizard-card .nav-pills li.active a .icon-circle')).addClass('checked');

        }
    });


    // Prepare the preview for profile picture
    $("#wizard-picture").change(function () {
        readURL(this);
    });

    $('[data-toggle="wizard-radio"]').click(function () {
        wizard = $(this).closest('.wizard-card');
        wizard.find('[data-toggle="wizard-radio"]').removeClass('active');
        $(this).addClass('active');
        $(wizard).find('[type="radio"]').removeAttr('checked');
        $(this).find('[type="radio"]').attr('checked', 'true');
    });

    $('[data-toggle="wizard-checkbox"]').click(function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(this).find('[type="checkbox"]').removeAttr('checked');
        } else {
            $(this).addClass('active');
            $(this).find('[type="checkbox"]').attr('checked', 'true');
        }
    });

    $('.set-full-height').css('height', 'auto');

});

//Function to show image before upload

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#wizardPicturePreview').attr('src', e.target.result).fadeIn('slow');
        };
        reader.readAsDataURL(input.files[0]);
    }
}

$("#prix").slider({});
$("#superficie").slider({});
$(function () {

    var logementsTable = $('#logementsTable').DataTable({
        'paging': true,
        'lengthChange': false,
        'searching': true,
        'ordering': true,
        'info': true,
        'autoWidth': false,
        select: {
            style: 'single'
        }
    });
    var table = $('#clientsTab').DataTable({
        'paging': true,
        'lengthChange': false,
        'searching': true,
        'ordering': true,
        'info': true,
        'autoWidth': false,
        select: {
            style: 'single'
        }
    });

    table.on('select', function (e, dt, type, indexes) {
        var rowData = table.rows(indexes).data().toArray();
        $('#clientId').val(rowData[0][0]);
        document.getElementById("clientIdDetails").innerHTML = rowData[0][0];
        document.getElementById("numeroTelephoneClient").innerHTML = rowData[0][5];
        document.getElementById("nomCompletClient").innerHTML = rowData[0][1] + " " + rowData[0][2];
        document.getElementById("dateNaissClient").innerHTML = rowData[0][4];

    });

    logementsTable.on('select', function (e, dt, type, indexes) {
        var rowData = logementsTable.rows(indexes).data().toArray();
        $('#selectedlogementId').val(rowData[0][0]);
        $('#selectedlogementadresse').val(rowData[0][1]);
        $('#selectedLogementSuperficie').val(rowData[0][3]);
        $('#selectedlogementprice').val(rowData[0][4]);

        document.getElementById("idLogementDetails").innerHTML = rowData[0][0];
        document.getElementById("superficieDetails").innerHTML = rowData[0][3];
        document.getElementById("prixDetails").innerHTML = rowData[0][4];
    });
});


function fillDetails() {
    document.getElementById("regionDetails").innerHTML = $('#region').children("option").filter(":selected").text();
    document.getElementById("nbrPiecesDetails").innerHTML = $('#nbrPieces').val();
    document.getElementById("nbrEtagesDetails").innerHTML = $('#nbrEtages').val();
    document.getElementById("nbrSDBDetails").innerHTML = $('#nbrSdb').val();

    if ($('#villa').is(":checked"))
        document.getElementById("typeDetails").innerHTML = "villa";
    else
        document.getElementById("typeDetails").innerHTML = "appartement";

    if ($('#soussol').is(":checked"))
        document.getElementById("sousSolDetails").innerHTML = "oui";
    else
        document.getElementById("sousSolDetails").innerHTML = "non";

    if ($('#jardin').is(":checked"))
        document.getElementById("jardinDetails").innerHTML = "oui";
    else
        document.getElementById("jardinDetails").innerHTML = "non";

    if ($('#meuble').is(":checked"))
        document.getElementById("meubleDetails").innerHTML = "oui";
    else
        document.getElementById("meubleDetails").innerHTML = "non";
    if ($('#garage').is(":checked"))
        document.getElementById("garageDetails").innerHTML = "oui";
    else
        document.getElementById("garageDetails").innerHTML = "non";

}

function fillOtherInputs(id) {
    visites.forEach(function (entry) {
        if (entry['id'] === id) {
            var agent = Ext.util.JSON.decode(entry['url']);
            $('#idAgent').val(agent['id']);

            $('#heureDebutVisite').val(entry['start']);
            $('#heureFinVisite').val(entry['end']);


            document.getElementById("idAgentDetails").innerHTML = agent['id'];
            document.getElementById("nomAgentDetails").innerHTML = agent['name'];
            document.getElementById("sexeAgentDetails").innerHTML = agent['sexe'];

            document.getElementById("dateVisiteDetails").innerHTML = entry['start'];
            document.getElementById("heureDetails").innerHTML = entry['start'];
            document.getElementById("dureeVisiteDetails").innerHTML = "" + (entry['end'] - entry['start']);

        }
    });
}

var visites;

function getVisites() {
    var logementId = $('#selectedLogementId').val();
    var url = "/visitesApi?+action=possibleVisites&logementId=" + logementId;
    $.ajax({
        url: url, async: false, success: function (result) {
            visites = Ext.util.JSON.decode(result);
        }
    });
    return visites;
}

var calendar = $('#calendar').fullCalendar({
    themeSystem: 'standard',
    defaultView: 'agendaWeek',

    header: {
        left: 'prev,next today',
        center: 'title',
        right: 'agendaWeek,month'
    },
    title: "choisissez une date",
    // defaultDate: '2018-03-12',
    weekNumbers: false,
    navLinks: false, // can click day/week names to navigate views
    editable: false,
    eventLimit: true, // allow "more" link when too many events
    hiddenDays: [6, 7], // hide Tuesdays and Thursdays
    selectable: true,
    unselectAuto: false,
    businessHours: {
        // days of week. an array of zero-based day of week integers (0=Sunday)
        dow: [0, 1, 2, 3, 4, 5], // Monday - Thursday

        start: '8:00', // a start time (10am in this example)
        end: '16:00' // an end time (6pm in this example)
    },
    // days of week. an array of zero-based day of week integers (0=Sunday)
    dow: [0, 1, 2, 3, 4, 5], // Monday - Thursday
    start: '8:00', // a start time (10am in this example)
    end: '16:00', // an end time (6pm in this example)
    events: getVisites(),
    eventColor: '#378006',
    displayEventTime: false,
    eventClick: function (calEvent, jsEvent, view) {

        // change the border color just for fun
        $(this).css('background', 'red');

        console.log('Event: ' + calEvent.start.format() + 'to ' + calEvent.end.format());
        console.log(calEvent.id);
        //$('#idVisite').val(calEvent.id);
        fillOtherInputs(calEvent.id);
        return false;

        // addInputToDocument('selectedEventId', calEvent.id);
    }
});


function confirmerVisite() {

    var idLogement = $('#selectedlogementId').val();
    var idClient = $('#clientId').val();
    var idAgent = $('#idAgent').val();
    var heureDebut = $('#heureDebutVisite').val();
    var heureFin = $('#heureFinVisite').val();

    var params = {
        idLogement: idLogement,
        idClient: idClient,
        idAgent: idAgent,
        heureDebut: heureDebut,
        heureFin: heureFin
    };
    post("#", params, "get");
}


function post(path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for (var key in params) {
        if (params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();
}

function addInputToDocument(id, value) {
    document.body.find(id).remove();

    var hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("id", id);
    hiddenField.setAttribute("value", value);
    document.body.appendChild(hiddenField);
}