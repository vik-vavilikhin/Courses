'use strict';
/* 
let btn = document.querySelector('button');

btn.addEventListener('click', () => {
	alert('Что-то произошло');
});
 */

/* 
let drink = 0;

function shoot(arrow, headshot, fail) {
	console.log('Вы сделали выстрел...');
	
	setTimeout(function () {
		let ran = Math.random()
		ran > .5 ? headshot({}) : fail('Вы промахнулись');
	}, 3000);
}

function win() {
	console.log('Вы победили!');
	drink == 1 ? buyBeer() : giveMoney();
}
function buyBeer() {
	console.log('Вам купили пиво...');
}
function giveMoney() {
	console.log('Вам дали денег...');
	
}

function loose() {
	console.log('Вы проиграли!');
}

shoot({}, 
	function(mark) {
		console.log('Вы попали!');
		win(mark, buyBeer, giveMoney);
	},
	function(miss) {
		console.error(miss);
		loose();
	}
);
 */

let drink = 0;

function shoot(arrow) {
	console.log('Вы сделали выстрел...');
	let promise = new Promise(function (resolve, reject) {
		setTimeout(function() {
			let ran = Math.random();
			ran > .5 ? resolve({}) : reject('Вы промахнулись');
		}, 3000);
	});
	return promise;
}

function win() {
	console.log('Вы победили!');
	drink == 1 ? buyBeer() : giveMoney();
}
function buyBeer() {
	console.log('Вам купили пиво...');
}
function giveMoney() {
	console.log('Вам дали денег...');

}

function loose() {
	console.log('Вы проиграли!');
}

shoot({})
	.then(mark => console.log('Вы попали!'))
	.then(win)
	.catch(loose);