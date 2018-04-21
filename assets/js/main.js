var yourGlobalVariable;

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
    });

    logementsTable.on('select', function (e, dt, type, indexes) {
        var rowData = table.rows(indexes).data().toArray();
        $('#selectedlogementId').val(rowData[0][0]);
        $('#selectedlogementadresse').val(rowData[0][1]);
        $('#selectedLogementSuperficie').val(rowData[0][3]);
        $('#selectedlogementprice').val(rowData[0][4]);
    })
});


function fillOtherInputs(id) {

}

var visites;

function getVisites() {
    var logementId = $('#selectedLogementId').val();
    var url = "/visitesApi?+action=possibleVisites&logementId" + logementId;
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
        // addInputToDocument('selectedEventId', calEvent.id);
    }
});


function confirmerVisite() {

    var idLogement = $('#selectedlogementId').val();
    var idClient = $('#clientId').val();
    var idAgent = $('#idAgent').val();
    var date = $('#date').val();
    var heureDebut = $('#heureDebut').val();
    var heureFin = $('#heureFin').val();

    var params = {
        idLogement: idLogement,
        idClient: idClient,
        idAgent: idAgent,
        date: date,
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