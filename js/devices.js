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

var device_record_html = '<tr id="device-{id}" class="clickable_row"><td>{id}</td> <td>{name}</td> <td>{type}</td> <td>{external}</td> <td>{register}</td> <td>{coil}</td> <td>{bus}</td> <td><div class="btn-group"><a role="button" href="new_edit_device?id={id}" type="button" class="btn btn-warning" id="device-edit-{id}"><span class="glyphicon glyphicon-pencil"></span> Edit</a><button type="button" class="btn btn-warning dropdown-toggle" data-toggle="dropdown"><span class="caret"></span> <span class="sr-only">Toggle Dropdown</span></button><ul class="dropdown-menu" role="menu"><li><a id="device-delete-{id}"><span class="glyphicon glyphicon-remove"></span> Delete</a></li></ul></div></td> </tr>';

var form_html;

$(document).ready(function() {
	// change active class in nav menu
		$('ul.nav>li').removeClass('active');
		$('ul.nav>li#devices').addClass('active');

		load_devices(function() {
			draw_table(device_record_html, devices);

			$("a[id^='device-delete-']").click(function(e) {
				e.preventDefault();
				var id = $(this).attr('id').split('-')[2];
				// are you sure?
					$("#delete_confirmation").modal('show');

					$("#confirm-device-delete").click(function() {
						// delete request
							$.ajax( {
								type : "DELETE",
								url : url_device + "/" + id
							}).done(function() {
								console.log('done');
								$("#delete_confirmation").modal('hide');
								location.reload();
							}).fail(function(xhr, status, error) {
								$("#delete_confirmation").modal('hide');

								errorMessage($("#delete-device-alert"), xhr.responseJSON);
							});
						})
				});
		});
	});

// <div class="btn-group"><a role="button" href="edit_device?id={id}"
// type="button" class="btn btn-warning" id="device-edit-{id}"><span
// class="glyphicon glyphicon-pencil"></span> Edit</a><button type="button"
// class="btn btn-warning dropdown-toggle" data-toggle="dropdown"><span
// class="caret"></span> <span class="sr-only">Toggle
// Dropdown</span></button><ul class="dropdown-menu" role="menu"><li><a
// id="device-delete-{id}"><span class="glyphicon glyphicon-remove"></span>
// Delete</a></li></ul></div>
