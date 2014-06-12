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

var map = [ 'onewiretemperature', 'enoceantemperature', 'pifaceonoff' ];

$(document).ready(function() {
	// change active class in nav menu
		$('ul.nav>li').removeClass('active');
		$('ul.nav>li#devices').addClass('active');

		// get parameter from url
		var id = getUrlParameter('id');

		if (id != undefined) {

			// get device by id
			load_device_by_id(id, function() {

				// fill the form
					$('#device-id-input').val(device.id);
					$('#device-id-input').attr('disabled', 'disabled');

					// set the name
					$('input[name="name"]').val(device.name);

					// set the type
					$('select[name="type"]').val(device.type);
					// set the bus
					$('select[name="bus"]').val(device.bus);

					// set external
					$('select[name="external"]').val(device.external + "");
					$("#device-external-selection").change();

					// register and addess
					$('#device-register-input').val(device.register);
					$('#device-address-input').val(device.address);
					$('#device-coil-input').val(device.coil);
					$('#device-eep-input').val(device.eep);

					// updates form
					$("#device-type-selection").change();
				});
		}

		$("#edit-device-form").submit(function(e) {
			e.preventDefault();
			// get form data
				var form_array = $('#edit-device-form').serializeArray();

				// try number convertion

				for (i in form_array) {
					var item = form_array[i];

					if (item.name == 'coil') {
						item.value = parseInt(item.value);
					}
				}

				console.log(form_array);
				var json = buildJSON(form_array, "\"id\" : \"" + $('#device-id-input').val() + "\"");

				console.log(json);

				var bus = $('#device-bus-selection').val();
				var type = $("#device-type-selection").val();

				// build css class key
				var key = bus + type.toLowerCase();

				var found = $.inArray(key, map) > -1;

				if (!found) {
					alert("Wrong device type/bus association");
					return;
				}

				$.ajax( {
					url : url_device,
					type : 'POST',
					data : json
				}).done(function() {
					console.log('edit device success');
					// history.back();
						window.location = 'devices_config';
					}).fail(function(xhr, status, error) {
					errorMessage($("#edit-device-alert"), xhr.responseJSON);
				});

			});

		// check selected value of combo
		$("#device-type-selection").change(function(e) {
			updateForm();
		});

		// check selected value of bus/combo
		$("#device-bus-selection").change(function(e) {
			updateForm();
		});

		$("#device-type-selection").change();
	});

function updateForm() {
	var bus = $('#device-bus-selection').val();
	var type = $("#device-type-selection").val();

	// build css class key
	var key = bus + type.toLowerCase();

	var found = $.inArray(key, map) > -1;

	if (found) {
		// check bus/type key
		$('.device').hide();
		$('.' + key).show();
	} else {
		alert("Wrong device type/bus association");
	}
}
