const formSearch = document.querySelector('.form-search'),
    // ====== FROM ============== //
    inputCitiesFrom = formSearch.querySelector('.input__cities-from'),
    dropdownCitiesFrom = formSearch.querySelector('.dropdown__cities-from'),
    // ====== TO ================ //
    inputCitiesTo = formSearch.querySelector('.input__cities-to'),
    dropdownCitiesTo = formSearch.querySelector('.dropdown__cities-to'),
    // ====== DATE ============== //
    inputDateDepart = formSearch.querySelector('.input__date-depart'),
    // ====== BUTTON ============ //
    buttonSearch = formSearch.querySelector('.button__search'),
    buttonSearchText = formSearch.querySelector('.button__search-text');

const cities = [
    'Москва',
    'Санкт-Петербург',
    'Минск',
    'Караганда',
    'Челябинск',
    'Керчь',
    'Волгоград',
    'Самара',
    'Екатеринбург',
    'Днепропетровск',
    'Одеса',
    'Ухань',
    'Шымкент',
    'Калининград',
    'Нижний Новгород',
    'Вроцлав',
    'Ростов-нв-Дону',
];

const showCity = (input, list) => {
    list.textContent = '';

    if (input.value !== '') {
        const filterCities = cities.filter((item) => {
            const fixItem = item.toLowerCase();
            return fixItem.includes(input.value.toLowerCase());
        })

        filterCities.forEach((item) => {
            const li = document.createElement('li');
            li.classList.add('dropdown__city');
            li.textContent = item;
            list.append(li);
        });
    }
};

// ========================= //
inputCitiesFrom.addEventListener('input', () => {
    showCity(inputCitiesFrom, dropdownCitiesFrom);
});
inputCitiesTo.addEventListener('input', () => {
    showCity(inputCitiesTo, dropdownCitiesTo);
});

// ========================= //
dropdownCitiesFrom.addEventListener('click', (event) => {
    const target = event.target;
    if(target.tagName.toLowerCase() === 'li') {
        inputCitiesFrom.value = target.textContent;
        dropdownCitiesFrom.textContent = '';
        
        // console.log(target.textContent);
    }
});

dropdownCitiesTo.addEventListener('click', () => {
    const target = event.target;
    if (target.tagName.toLowerCase() === 'li') {
        inputCitiesTo.value = target.textContent;
        dropdownCitiesTo.textContent = '';
    }
});