// Функция для получения элемента DOM по его идентификатору
function getElementById(id) {
    return document.querySelector(`#${id}`);
}

// Функция для подсчета количества повторений строки в массиве
function countOccurrences(array, searchString) {
    return array.reduce((count, string) => count + (string === searchString ? 1 : 0), 0);
}

// Функция для обновления элемента счетчика
function updateCountElement(countElement, count) {
    countElement.innerHTML = count !== 0 ? `Количество: ${count}` : '';
}

// Получение элементов DOM
const roseAdd = getElementById('rosa');
const pioniAdd = getElementById('pioni');
const romashkiAdd = getElementById('romashki');
const tulpaniAdd = getElementById('tulpani');

const countCart = getElementById('count');

const roseCrease = getElementById('rosa_crease');
const pioniCrease = getElementById('pioni_crease');
const romashkiCrease = getElementById('romashki_crease');
const tulpaniCrease = getElementById('tulpani_crease');

const countRose = getElementById('countRose');
const countDaisies = getElementById('countDaisies');
const countPeonies = getElementById('countPeonies');
const countTulips = getElementById('countTulips');

// Объект с информацией о цветах
const flowers = {
    'Розы': { add: roseAdd, crease: roseCrease },
    'Тюльпаны': { add: tulpaniAdd, crease: tulpaniCrease },
    'Ромашки': { add: romashkiAdd, crease: romashkiCrease },
    'Пионы': { add: pioniAdd, crease: pioniCrease }
};

// Создание отслеживаемого массива
const order = createTrackedArray([], onChange);

// Функция для создания отслеживаемого массива с обратным вызовом при изменениях
function createTrackedArray(array, onChange) {
    return new Proxy(array, {
        set(target, property, value) {
            target[property] = value;
            onChange();
            return true;
        },
        deleteProperty(target, property) {
            delete target[property];
            onChange();
            return true;
        },
    });
}

// Обработчик изменений в массиве
function onChange() {
    // Обновление видимости элементов в зависимости от наличия цветов в заказе
    for (const flower in flowers) {
        const { add, crease } = flowers[flower];
        if (order.includes(flower)) {
            add.style.display = 'none';
            crease.style.display = 'flex';
        } else {
            add.style.display = 'flex';
            crease.style.display = 'none';
        }
    }

    // Подсчет и обновление количества цветов в заказе
    const countRoseFn = countOccurrences(order, 'Розы');
    const countPeoniesFn = countOccurrences(order, 'Пионы');
    const countTulipsFn = countOccurrences(order, 'Тюльпаны');
    const countDaisiesFn = countOccurrences(order, 'Ромашки');

    updateCountElement(countRose, countRoseFn);
    updateCountElement(countPeonies, countPeoniesFn);
    updateCountElement(countTulips, countTulipsFn);
    updateCountElement(countDaisies, countDaisiesFn);

    // Обновление общего количества товаров в корзине
    countCart.innerHTML = `(${order.length})`;
}

// Функция для добавления цвета в заказ
const addToCart = (item) => {
    order.push(item);
};

// Функция для удаления цвета из заказа
const deleteFromCart = (item) => {
    const indexItem = order.slice().reverse().findIndex((element) => element === item);
    if (indexItem !== -1) {
        order.splice(order.length - 1 - indexItem, 1);
    }
};