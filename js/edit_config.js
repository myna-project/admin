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

$(document).ready(function(){
	//change active class in nav menu
	$('ul.nav>li').removeClass('active');
	$('ul.nav>li#config').addClass('active');
	
	load_config(function(config){
		
		for(var key in config){ 
			console.log('key name: ' + key + ' value: ' + config[key]);
			var inner_array = config[key];
			
			for(inner_key in inner_array){
				console.log('inner key name: ' + inner_key + ' inner value: ' + inner_array[inner_key]);
				config_par = $("<div class='form-group'>");
				config_par_key = $("<label for='config-"+key+"-"+inner_key+"-input' class='col-sm-4'>").text(key+"."+inner_key);
				config_input_container = $("<div class='col-sm-8'>");
				config_input_value = $("<input name='"+inner_key+"' type='text' class='form-control' id='config-"+key+"-"+inner_key+"-input'>").val(config[key][inner_key]);
				config_input_container.append(config_input_value);
				
				config_par.append(config_par_key);
				config_par.append(config_input_container);
				
				$("#edit-config-form").prepend(config_par);
			}
			
		}
		
	});
	
	$("#edit-config-form").submit(function(e){
		e.preventDefault();
		
		var json_array = new Array();
		
		var general = '"plant" : {"plantid":"'+$("#config-plant-plantid-input").val()+'"}';
		json_array.push(general);
		
		var daemon = '"daemon" : {"ListenPort":'+$("#config-daemon-ListenPort-input").val()+', "ListenAddress" : "'+$("#config-daemon-ListenAddress-input").val()+'"}';
		json_array.push(daemon);
		
		var mail = '"mail" :{"smtp" :"'+$("#config-mail-smtp-input").val()+'" , "from_address" : "'+$("#config-mail-from_address-input").val()+'"}'
		json_array.push(mail);
		
		var alert = '"alert":{"temperature_mail_to":"'+$("#config-alert-temperature_mail_to-input").val()+'", "unable_mail_to":"'+$("#config-alert-unable_mail_to-input").val()+'", "temperature_tupper":'+$("#config-alert-temperature_tupper-input").val()+', "temperature_tlower":'+$("#config-alert-temperature_tlower-input").val()+', "temperature_enable" : ' + $('#config-alert-temperature_enable-input').val() + ', "unable_enable" : ' + $('#config-alert-unable_enable-input').val() + ' }';
		json_array.push(alert);
		
		var alert = '"security":{"allow":"'+$("#config-security-allow-input").val()+'", "deny":"'+$("#config-security-deny-input").val() +'"}';
		json_array.push(alert);
		
		console.log(json_array);
		var json = '{'+json_array.join(',')+'}';
		console.log(json);
		
		
		$.post(url_config,json, function(){
			console.log('edit config success');
			//history.back();
			window.location = 'system_config'
		}).fail(function(xhr, status, error){
			errorMessage($("#add-logic-alert"), xhr.responseJSON);
		});
	});
});
