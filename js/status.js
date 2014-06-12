/*******************************************************************************
* Copyright (c) 2014 Proxima Centauri srl <info@proxima-centauri.it>.
*  All rights reserved. This program and the accompanying materials
*  are made available under the terms of the GNU Public License v3.0
*  which accompanies this distribution, and is available at
*  http://www.gnu.org/licenses/gpl.html
*   
*  Contributors:
*      Proxima Centauri srl <info@proxima-centauri.it> - initial API and implementation
*******************************************************************************/

var body_html = '<div> <div class="page-header"><h3>{id} <small>{name} (external : {external})</small></h3></div></div>';
var device_html = '<div class="panel panel-default"><div class="panel-heading"><h6 class="panel-title">{id}</h6></div> <div class="panel-body"> body </div></div>';

var device_temperature = '<div class="row {id}"><div class="col-md-2"><b>Type:</b> {type}</div><div class="col-md-2"><b>Value:</b> <span>--</span></div></div>';

var device_onoff = '<div class="row {id}"><div class="col-md-2"><b>Type:</b> {type}</div><div class="col-md-2"><b>Value:</b> <span>--</span></div> <div class="col-md-2 btn-place"></div></div>';
var service_state = '<h4>{name} <span class="label {label} pull-right">Running: {running}</span></h4>';

function draw_status_room() {

	div = $('#room');
	
	for (i in maps) {
		room = maps[i];

		body = $(nano(body_html, room));

		// append devices
		for (j in devices) {
			device = devices[j];

			if ($.inArray(device.id, room.devices) >= 0) {
				console.log(room.id + " - " + device.id);

				divPanel = $(nano(device_html, device));

				body_panel = divPanel.find('.panel-body');

				// append the right type
				if (device.type == "OnOff") {
					div_content = nano(device_onoff, device);
				} else {
					div_content = nano(device_temperature, device);
				}

				body_panel.html(div_content);
				body.append(divPanel);
			}
		}

		div.append(body);
	}
}

var button_html = '<button type="button" class="btn btn-default" data-command="{command}" data-id="{id}">Turn {command}</button>';

function show_status(status) {

	var date = new Date();
	var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes()
			+ ":" + date.getSeconds();

	$('#time').html(str);

	for (s in status) {
		state = status[s];
		element = $('.' + state.id);
		element.each(function() {

			string = '--'
			if (state.type == "Temperature") {
				string = state.value + " " + state.unit;
			} else {
				if (state.value) {
					string = 'On';
					button_data = {
						command : "off",
						id : state.id
					};
				} else {
					string = 'Off';
					button_data = {
						command : "on",
						id : state.id
					};

				}
				// append the button
				$(this).find(".btn-place button").remove();
				$(this).find(".btn-place").append(nano(button_html, button_data));
				$(this).find("button").click(execute_command);
			}

			// update button status
			$(this).find("span").html(string);
		});
	}
}

function show_services(services) {

	var div = $("#services");
	div.empty();
	for (i in services) {
		serv_state = services[i];
		if (serv_state.running)
			serv_state.label = "label-success";
		else
			serv_state.label = "label-warning";
		div.append(nano(service_state, serv_state));
	}

}

function start_polling() {
	setInterval(function() {
		load_status(show_status);
		load_services(show_services);
	}, 1000);
}

function execute_command() {
	// get device id and command
	var id = $(this).attr('data-id');
	var command = $(this).attr('data-command');
	$(this).attr("disabled", true);

	console.log("Execute command " + command + " on " + id);

	var url_command = base_url + "/devices/" + id + "/commands/" + command;

	// /devices/{id}/commands/on
	$.post(url_command, function(data) {
	});
}

$(document).ready(function() {
	load_room(function() {

		load_devices(function() {
			draw_status_room();
			// start the polling
		start_polling();
	});
});
});
