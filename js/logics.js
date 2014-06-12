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

var logics_row = "<tr id='logic-{id}'><td>{id}</td><td>{type}</td><td>{my_temp}</td> <td>{room}</td> <td>{enabled}</td> <td>"
		+ "<div class=\"btn-group\">"
		+ "<button type=\"button\" class=\"btn btn-default\" id=\"logic-command-{id}\" data-command=\"{command}\">{txt}</button>"
		+ "<button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\">"
		+ "<span class=\"caret\"></span>"
		+ "<span class=\"sr-only\">Toggle Dropdown</span>"
		+ "</button>"
		+ "<ul class=\"dropdown-menu\" role=\"menu\">"
		+ "<li><a role=\"button\" href=\"new_edit_logic?id={id}\" type=\"button\" id=\"logic-edit-{id}\"><span class=\"glyphicon glyphicon-pencil\"></span> Edit</a></li>"
		+ "<li><a type=\"button\" id=\"logic-delete-{id}\"> <span class=\"glyphicon glyphicon-remove\"></span> Delete</a></li></ul>"
		+ " </div></td></tr>";

$(document).ready(function() {
	console.log("logics configuration");

	$('ul.nav>li').removeClass('active');
	$('ul.nav>li#logics').addClass('active');

	load_logics(function(logics) {

		for ( var i = 0; i < logics.length; i++) {

			var logic = logics[i];

			if (logics[i].enabled == false) {
				logic['command'] = "enable";
				logic['txt'] = "Enable";
			} else {
				logic['command'] = "disable";
				logic['txt'] = "Disable";
			}
			
			logic['my_temp'] = "";
			
			if (typeof(logic.temp) !== 'undefined') {
				logic['my_temp'] = logic.temp.value + " " + logic.temp.unit;
			}
			
			$("#table_body").append(nano(logics_row, logic));
		}

		$("button[id^='logic-command-']").click(function() {
			var id = $(this).attr('id').split('-')[2];
			console.log(id);
			console.log($(this).attr('data-command'));
			console.log(url_logic + '/' + id + '/commands/' + $(this).attr('data-command'));
			$.post(url_logic + '/' + id + '/commands/' + $(this).attr('data-command'), function() {
				console.log('done');
				window.location.reload();
			}).fail(function(xhr, status, error) {
				errorMessage($("#commands-logic-alert"), xhr.responseJSON);
			});

		});

		$("a[id^='logic-delete-']").click(function(e) {
			e.preventDefault();
			var id = $(this).attr('id').split('-')[2];
			console.log(id);
			// are you sure?
				$("#delete_confirmation").modal('show');

				$("#confirm-logic-delete").click(function() {
					// delete request
						$.ajax( {
							type : "DELETE",
							url : url_logic + "/" + id
						}).done(function() {
							console.log('done');
							$("#delete_confirmation").modal('hide');
							location.reload();
						}).fail(function(xhr, status, error) {
							console.log('done');
							errorMessage($("#delete-logic-alert"), xhr.responseJSON);
						});
					});
			});
	});
});

// <div class="btn-group">
// <button type="button" class="btn btn-danger">Action</button>
// <button type="button" class="btn btn-danger dropdown-toggle"
// data-toggle="dropdown">
// <span class="caret"></span>
// <span class="sr-only">Toggle Dropdown</span>
// </button>
// <ul class="dropdown-menu" role="menu">
// <li><a href="#">Action</a></li>
// <li><a href="#">Another action</a></li>
// <li><a href="#">Something else here</a></li>
// <li class="divider"></li>
// <li><a href="#">Separated link</a></li>
// </ul>
// </div>

// <div class="btn-group">
// <button type="button" class="btn btn-danger">Action</button>
// <button type="button" class="btn btn-danger dropdown-toggle"
// data-toggle="dropdown">
// <span class="caret"></span>
// <span class="sr-only">Toggle Dropdown</span>
// </button>
// <ul class="dropdown-menu" role="menu">
// <li><a role="button" href="new_edit_logic?id={id}" type="button"
// id="logic-edit-{id}"><span class="glyphicon glyphicon-pencil"></span>
// Edit</a></li>
// <li><a type="button" id="logic-delete-{id}"> <span class="glyphicon
// glyphicon-remove"></span> Delete</a></li>
// </ul>
// </div>
