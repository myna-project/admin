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

var base_url ='';
function setup_url(base_url_){
	base_url = base_url_;
	url_map = base_url + "/maps";
	url_device = base_url + "/devices";
	url_status = base_url + "/status";
	url_config = base_url + "/config";
	url_logic = base_url + "/logics";
	url_services = base_url + "/services";

}

var maps;
var devices;
var room;
var logic;

function load_room(func) {
	console.log("Load maps")

	$.get(url_map, function(data) {
		maps = data.maps;
		console.log("Load maps DONE");
		func();
	});
}

function load_services(func) {
	$.get(url_services, function(data) {
		func(data.services);
	});
}

function load_room_by_id(id, func){
	console.log("Load room by id");
	$.get(url_map+'/'+id, function(data) {
		room = data;
		console.log("Load room by id DONE ");
		func()
	});
}

function load_devices(func) {
	console.log("Load device")

	$.get(url_device, function(data) {
		devices = data.devices;
		console.log("Load devices DONE");
		func();
	});
}

function load_device_by_id(id, func){
	console.log("Load device by id");
	$.get(url_device+'/'+id, function(data) {
		device = data;
		console.log("Load device by id done ");
		func()
	});
}

function load_status(func) {
	$.get(url_status, function(data) {
		func(data.status);
	});
}

function load_logics(func) {
	$.get(url_logic, function(data) {
		func(data.logics);
	});
}


function load_logic_by_id(id,func) {
	$.get(url_logic+'/'+id, function(data) {
		logic=data;
		func();
	});
}
function load_config(func){
	$.get(url_config, function(data){
		func(data.config);
	});
}

function draw_table(record_html, array){
	tablebody = $("#table_body");
	for (i in array){
		element = array[i];
		console.log(record_html);
		record = $(nano(record_html, element))	
		console.log(record);
		tablebody.append(record);
	}
}

// From object array to json string
// array should be: [ {name:"", value:''} , {....}]
function buildJSON(array, extra_object){
	console.log(array);
	var json_string = "{"
	for (i in array){
		var key = array[i].name;
		var value = array[i].value;
		if(value=="true" || value=="false"){
			json_string = json_string + '"'+key+'":'+value;
		}
		else{
			if (value == '' || isNaN(value))
				json_string = json_string + '"'+key+'":"'+value+'"';
			else
				json_string = json_string + '"'+key+'":'+value+'';

		}
		
		if(i<array.length-1){
			json_string = json_string +',';
		}
	}
	
	if(extra_object!=null&&extra_object!=""){
		json_string = json_string +","+ extra_object;
	}
	
	json_string = json_string +'}';
	return json_string;
}

function getUrlParameter(sParam){
	var sPageURL = window.location.search.substring(1);
	var sURLVariables = sPageURL.split('&');
	for (var i = 0; i < sURLVariables.length; i++){
		var sParameterName = sURLVariables[i].split('=');
		if (sParameterName[0] == sParam){
			return sParameterName[1];
		}
	}
}

function errorMessage(alert, responseJson){
	alert.removeClass('hidden');
	alert.html(responseJson.error.message);
}
