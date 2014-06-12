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

function deleteRow(i) {
	var tr = $('tr#logic_' + i);
	tr.remove();
	return false;
}

function createRow(i) {
	var row = '<tr id="logic_'
			+ i
			+ '"><td><input name="temp" class="form-control" type="text" id="logic-temperature-input"/></td><td><input name="start" class="form-control" type="text" id="logic-start-input"/></td><td><input name="stop" class="form-control" type="text" id="logic-stop-input"/></td><td><select multiple name="days" class="form-control" id="logic-days-input"><option>Sunday</option><option>Monday</option><option>Tuesday</option><option>Wednesday</option><option>Thursday</option><option>Friday</option><option>Saturday</option></select></td><td><a class="deleteLink" href="#" onclick="deleteRow('
			+ i + ')">Delete logic</a></td></tr>';
	$("#logic-table").append(row);
}

$(document).ready(function() {
	$('ul.nav>li').removeClass('active');
	$('ul.nav>li#logics').addClass('active');

	var id = getUrlParameter('id');

	// load rooms

		load_room(function() {
			// fill room selection
			for ( var i = 0; i < maps.length; i++) {
				if (maps[i].external == false) {
					var opt = $("<option>").val(maps[i].id).text(maps[i].name);
					$("#logic-room-input").append(opt);
				}
			}

			if (id != undefined) {

				// load logic by id
				load_logic_by_id(id, function() {

					// fill form with existing values
						$("#logic-type-input").val(logic.type);

						// highlight only selected rooms
						$("#logic-room-input>option").each(function() {
							if ($(this).val() == logic.room) {
								$(this).attr('selected', 'selected');
							}
						});

						// set the time or
						if (logic.type == "TimeProgramming") {

							for (i in logic.time) {
								// get the current time
								var time = logic.time[i];
								console.log(time);

								if (i > 0) {
									// add a new row
									$("#add-logic-window").click();
								}
								// fill all data
								var logic_id = '#logic_' + i;
								// start stop time
								$(logic_id + " >> #logic-start-input").val(time.start);
								$(logic_id + " >> #logic-stop-input").val(time.stop);

								// temperature
								$(logic_id + " >> #logic-temperature-input").val(time.temp.value);

								$(logic_id + " >> #logic-days-input>option").each(function() {
									for ( var j = 0; j < time.days.length; j++) {
										if ($(this).val() == time.days[j]) {
											$(this).attr('selected', 'selected');
										}
									}
								});

							}
						} else {
							$("#logic-temperature-input").val(logic.temp.value);
						}
						$('#logic-type-input').change();
					});
			}

		});

		$("#edit-logic-form").submit(function(e) {
			e.preventDefault();

			var json = {};

			// add the id
				if (id != undefined)
					json['id'] = id;

				// set the type
				json['type'] = $("#logic-type-input").val();

				if (json['type'] == "TimeProgramming") {
					json['time'] = [];

					// cycle on all time row
					$('tbody > tr').each(function() {
						console.log(this);

						var time = {};

						// load the start/stop time
							time['start'] = $(this).find("#logic-start-input").val();
							time['stop'] = $(this).find("#logic-stop-input").val()

							var days = $(this).find("#logic-days-input>option:selected").map(function() {
								return this.value;
							}).get();

							time['days'] = days;

							time['temp'] = {};
							time['temp']['value'] = parseInt($(this).find("#logic-temperature-input").val());

							json['time'].push(time);
							console.log(time);
						});

				} else {
					json['temp'] = {};
					json['temp']['value'] = parseInt($("#logic-temperature-input").val());
				}

				json['room'] = $("#logic-room-input>option:selected").val();

				$.ajax( {
					url : url_logic,
					data : JSON.stringify(json),
					type : 'POST'
				}).done(function() {
					console.log('edit logic success');
					window.location = "logics_config";
				}).fail(function(xhr, status, error) {
					errorMessage($("#edit-logic-alert"), xhr.responseJSON);
				});
			});

		var i = 0;

		$('#dynamic-table').append('<table id="logic-table" class="table"></table>');
		var table = $('#dynamic-table').children();
		table.append("<thead><tr><th>Temp</th><th>Time Start</th><th>Time Stop</th><th>Days</th><th>Delete</th></tr></thead>");
		table.append('<tbody></tbody>');
		var tbody = $('#dynamic-table').children();
		createRow(i);

		$("#add-logic-window").click(function() {
			i++;
			createRow(i);
		});
	});

$(document).ready(function() {

	$('#logic-type-input').change(function() {
		if ($(this).val() == 'ThresholdTemperature') {
			$('#dynamic-table').addClass('hidden');
			$('#add-logic-window').parent().addClass('hidden');
			$('#logic-temperature-input').parent().parent().removeClass('hidden');
		} else {
			$('#dynamic-table').removeClass('hidden');
			$('#add-logic-window').parent().removeClass('hidden');
			$('#logic-temperature-input').parent().parent().addClass('hidden');
		}
	});
});
