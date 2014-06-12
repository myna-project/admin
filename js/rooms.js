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

var room_record_html = '<tr id="room-{id}" class="clickable_row"><td>{id}</td> <td>{name}</td> <td>{devices}</td> <td>{external}</td><td><div class="btn-group"><a role="button" type="button" href="new_edit_room?id={id}" id="room-edit-{id}" class="btn btn-warning"><span class="glyphicon glyphicon-pencil"></span> Edit</a><button type="button" class="btn btn-warning dropdown-toggle" data-toggle="dropdown"><span class="caret"></span> <span class="sr-only">Toggle Dropdown</span></button><ul class="dropdown-menu" role="menu"><li><a id="room-delete-{id}"><span class="glyphicon glyphicon-remove"></span>Delete</a></li></ul></div></tr>';

$(document).ready(function() {

	// change active class in nav menu
		$('ul.nav>li').removeClass('active');
		$('ul.nav>li#rooms').addClass('active');

		load_room(function() {
			draw_table(room_record_html, maps);

			$("a[id^='room-delete-']").click(function(e) {
				e.preventDefault();
				var id = $(this).attr('id').split('-')[2];
				// are you sure?
					$("#delete_confirmation").modal('show');

					$("#confirm-room-delete").click(function() {
						console.log(url_map + "/" + id);
						// delete request
							$.ajax( {
								type : "DELETE",
								url : url_map + "/" + id
							}).done(function() {
								console.log('done');
								$("#delete_confirmation").modal('hide');
								location.reload();
							}).fail(function(xhr, status, error) {
								$("#delete_confirmation").modal('hide');
								errorMessage($("#delete-room-alert"), xhr.responseJSON);
							});
						});
				});
		});

	});

// <div class="btn-group"><a role="button" type="button"
// href="edit_room?id={id}" id="room-edit-{id}" class="btn btn-warning"><span
// class="glyphicon glyphicon-pencil"></span> Edit</a><button type="button"
// class="btn btn-warning dropdown-toggle" data-toggle="dropdown"><span
// class="caret"></span> <span class="sr-only">Toggle
// Dropdown</span></button><ul class="dropdown-menu" role="menu"><li><a
// role="button" type="button" class="btn btn-danger"
// id="room-delete-{id}"><span class="glyphicon glyphicon-remove"></span>
// Delete</a></li></ul></div>
