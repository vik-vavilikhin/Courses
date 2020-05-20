'use strict';

let inputRub = document.getElementById('rub');
let inputUsd = document.getElementById('usd');

inputRub.addEventListener('input', () => {
	let request = new XMLHttpRequest();

	// request.open(method, url, async, login, pass);
	request.open('GET', '../js/json/current.json');

	// Данные получены в формате .json из файла
	request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
	
	// request.send(body);
	request.send();

	// status 
	// statusText
	// responseText / response
	// readyState
	request.addEventListener('readystatechange', function() {
		if (request.readyState == 4 && request.status == 200) {
			let data = JSON.parse(request.response);
			inputUsd.value = (inputRub.value / data.usd).toFixed(2);
		} else {
			inputUsd.value = 'Что-то пошло не так';
		}

	});
});