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

//config_edit_button_html = '<button class="btn btn-warning"><span class="glyphicon glyphicon-pencil"></span> Edit</button>'

$(document).ready(function() {
	console.log('config is ready!');
	// change active class in nav menu
		$('ul.nav>li').removeClass('active');
		$('ul.nav>li#config').addClass('active');

		load_config(function(config) {
			console.log(config);
			// $("#config_list").append(JSON.stringify(config));

			for ( var key in config) {
				console.log('key name: ' + key + ' value: ' + config[key]);

				for (inner_key in config[key]) {
					console.log('inner key name: ' + inner_key + ' inner value: ' + config[key][inner_key]);

					config_record = $("<tr>");
					config_record_key = $("<td>").text(key + "." + inner_key);

					var value = config[key][inner_key];
					if (typeof(value) == 'boolean')
						if (value == false)
							value = "false"

					config_record_value = $("<td>").append(value);
					// config_edit_button =
					// $("<td>").html(config_edit_button_html);
					config_record.append(config_record_key);
					config_record.append(config_record_value);
					// config_record.append(config_edit_button);
					$("#config_table").append(config_record);
				}

			}
		});

	});
