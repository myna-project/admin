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

$(document).ready(function() {
	// change active class in nav menu
		$('ul.nav>li').removeClass('active');
		$('ul.nav>li#rooms').addClass('active');

		// set the id
		var id = getUrlParameter('id');

		// fill devices list
		load_devices(function() {
			// fill devices
			for ( var i = 0; i < devices.length; i++) {
				var opt = $("<option name='devices'>").val(devices[i].id).text(devices[i].id);
				$("#room-devices-input").append(opt);
			}

			// load by id
			if (id != undefined) {
				console.log("Page on modification mode");

				// load room data
				load_room_by_id(id, function() {
					// set the id, and disable
						$("#room-id-input").val(room.id);
						$("#room-id-input").attr('disabled', 'disabled')

						// set the name
						$("#device-name-input").val(room.name);

						// alert temperature
						if (room.alert.tupper) {
							$('#device-alert-tupper').val(room.alert.tupper);
						}

						// alert temperature
						if (room.alert.tlower) {
							$('#device-alert-tlower').val(room.alert.tlower);
						}

						// climatic
						if (room.climatic.x) {
							$('#device-climatic-x').val(room.climatic.x);
						}

						if (room.climatic.y) {
							$('#device-climatic-y').val(room.climatic.y);
						}

						if (room.climatic.k) {
							$('#device-climatic-k').val(room.climatic.k);
						}

						// highlight only selected devices
						$("#room-devices-input>option").each(function() {
							for ( var j = 0; j < room.devices.length; j++) {
								if ($(this).val() == room.devices[j]) {
									$(this).attr('selected', 'selected');
								}
							}
						});

						$('#room-external-selection>option').each(function() {
							var value = $(this).attr("value");

							if (value == new Boolean(room.external).toString())
								$(this).attr('selected', 'selected');

						});
					});
			}

		});

		$("#edit-room-form").submit(function(e) {
			e.preventDefault();

			// create the json
				var json = {};

				// room id
				json['id'] = $('#room-id-input').val();

				// room name
				json['name'] = $('#device-name-input').val();

				// room devices
				var devices = $("#room-devices-input>option:selected").map(function() {
					return this.value
				}).get();
				json['devices'] = devices;

				// external
				json['external'] = $('#room-external-selection>option:selected').map(function() {
					if (this.value == 'true')
						return true;
					return false;
				})[0];

				// alert
				json['alert'] = {};

				// tupper device-alert-tupper
				var tupper = $('#device-alert-tupper').val();
				if (tupper != '') {
					json['alert']['tupper'] = parseInt(tupper);
				}

				// tlower device-alert-tupper
				var tlower = $('#device-alert-tlower').val();
				if (tlower != '') {
					json['alert']['tlower'] = parseInt(tlower);
				}

				// climatic
				json['climatic'] = {};
				json['climatic']['x'] = parseFloat($('#device-climatic-x').val());
				json['climatic']['y'] = parseFloat($('#device-climatic-y').val());
				json['climatic']['k'] = parseFloat($('#device-climatic-k').val());

				console.log(json);

				$.ajax( {
					url : url_map,
					type : 'POST',
					data : JSON.stringify(json)
				}).done(function() {
					console.log('edit room success');
					window.location = "rooms_config";

				}).fail(function(xhr, status, error) {
					errorMessage($("#edit-room-alert"), xhr.responseJSON);
				});

			})
	});
