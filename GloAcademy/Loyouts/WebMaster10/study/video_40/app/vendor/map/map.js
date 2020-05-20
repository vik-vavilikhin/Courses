ymaps.ready(init);

function init() {
	// Создание экземпляра карты и его привязка к контейнеру с
	// заданным id ("map")
	var myMap = new ymaps.Map("map", {
		// При инициализации карты, обязательно нужно указать
		// ее центр и коэффициент масштабирования
		center: [55.693252, 37.617305], // г. Москва, Варшавское шоссе, дом 16, корпус 1, офис №8
		zoom: 17
	}, {
			searchControlProvider: 'yandex#search'
		}),

		// Создаем геообъект с типом геометрии "Точка".
		myGeoObject = new ymaps.GeoObject({
			// Описание геометрии.
			geometry: {
				type: "Point",
				coordinates: [55.693297, 37.618228]
			},
			// Свойства.
			properties: {
				// Контент метки.
				iconContent: 'ТПБ',
				hintContent: '"Технологии Пожарной безопасности".<br>г.Москва<br>Варшавское шоссе, <br>дом 16, корпус 1, офис №8'
			}
		});

	myMap.geoObjects
		.add(myGeoObject);
}