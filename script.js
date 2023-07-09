// Функция для получения элемента DOM по его идентификатору
const getElementById = (id) => {
    return document.querySelector(`#${id}`);
}

// Функция для подсчета количества повторений строки в массиве
const countOccurrences = (array, searchString) => {
    return array.reduce((count, string) => count + (string === searchString ? 1 : 0), 0);
}

// Функция для обновления элемента счетчика
const updateCountElement = (countElement, count) => {
    countElement.innerHTML = count !== 0 ? `Количество: ${count}` : '';
}


// Получение элементов DOM
const roseAdd = getElementById('rosa');
const pioniAdd = getElementById('pioni');
const romashkiAdd = getElementById('romashki');
const tulpaniAdd = getElementById('tulpani');

const countCart = getElementById('count');
const cart = getElementById('cart');

const roseCrease = getElementById('rosa_crease');
const pioniCrease = getElementById('pioni_crease');
const romashkiCrease = getElementById('romashki_crease');
const tulpaniCrease = getElementById('tulpani_crease');

const countRose = getElementById('countRose');
const countDaisies = getElementById('countDaisies');
const countPeonies = getElementById('countPeonies');
const countTulips = getElementById('countTulips');

const countTittle = getElementById('cart_countItems');

const cleanCartBtn = getElementById('cleanCart');

// Объект с информацией о цветах
const flowers = {
    'Розы': {add: roseAdd, crease: roseCrease},
    'Тюльпаны': {add: tulpaniAdd, crease: tulpaniCrease},
    'Ромашки': {add: romashkiAdd, crease: romashkiCrease},
    'Пионы': {add: pioniAdd, crease: pioniCrease}
};

// Создание отслеживаемого массива
let order = createTrackedArray([], onChange);

// Функция для создания отслеживаемого массива с обратным вызовом при изменениях
const createTrackedArray = (array, onChange) => {
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


// Создаем переменные для подсчета каждого товара
let countRoseFn = 0
let countPeoniesFn = 0
let countTulipsFn = 0
let countDaisiesFn = 0

// Обработчик изменений в массиве
const onChange = () => {
    // Обновление видимости элементов в зависимости от наличия цветов в заказе
    for (const flower in flowers) {
        const {add, crease} = flowers[flower];
        if (order.includes(flower)) {
            add.style.display = 'none';
            crease.style.display = 'flex';
        } else {
            add.style.display = 'flex';
            crease.style.display = 'none';
        }
    }

    // Подсчет и обновление количества цветов в заказе
    countRoseFn = countOccurrences(order, 'Розы');
    countPeoniesFn = countOccurrences(order, 'Пионы');
    countTulipsFn = countOccurrences(order, 'Тюльпаны');
    countDaisiesFn = countOccurrences(order, 'Ромашки');

    updateCountElement(countRose, countRoseFn);
    updateCountElement(countPeonies, countPeoniesFn);
    updateCountElement(countTulips, countTulipsFn);
    updateCountElement(countDaisies, countDaisiesFn);

    // Обновление общего количества товаров в корзине
    countCart.innerHTML = `(${order.length})`;
}


// Функция для добавления цвета в заказ
const addToCart = (item) => {
    order.push(item)
}

// Функция для удаления из заказа
const deleteFromCart = (item) => {
    const indexItem = order.slice().reverse().findIndex((element) => element === item);
    if (indexItem !== -1) {
        order.splice(order.length - 1 - indexItem, 1);
    }
}


// Получение элементов DOM
const modal = getElementById('modal');
const modalContent = getElementById('modal-content');
const closeBtn = getElementById('modal').getElementsByClassName('close')[0];
const totalPrice = getElementById('totalPrice');
const totalItems = getElementById('totalItems');
const orderButton = getElementById('orderButton');
const notificationWrapper = getElementById('notification_wrapper')

// Функция для открытия модального окна
const openModal = () => {
    modal.style.display = 'block';
}

// Функция для закрытия модального окна
const closeModal = () => {
    modal.style.display = 'none';
}

// Обработчик клика по кнопке "Корзина"
cart.addEventListener('click', openModal);

// Обработчик клика по кнопке закрытия модального окна
closeBtn.addEventListener('click', closeModal);

const notification = () => {
    notificationWrapper.style.display = 'block'
    setTimeout(() => {
        notificationWrapper.style.display = 'none'
    }, 1800)
}

// Переменная для подсчета суммы
let totalPriceValue = 0

// Данные о заказе
const orderData = [
    { name: 'Розы', count: countRoseFn },
    { name: 'Пионы', count: countPeoniesFn },
    { name: 'Тюльпаны', count: countTulipsFn },
    { name: 'Ромашки', count: countDaisiesFn },
]

// Перебор данных о заказе(искл. товары которые не заказали)
const orderDataMsg = orderData
    .filter(i => i.count !== 0)
    .map(i => ` ${i.name}: ${i.count}`)
    .join(' ')

// Обработчик клика по кнопке "Заказать"
orderButton.addEventListener('click', () => {
    closeModal();
    notification();
    tg.sendData(orderDataMsg + totalPriceValue)
});

// Цена на цветы
const priceRose = 15000
const pricePeony = 10000
const priceTulip = 5000
const priceRomashki = 2500

// Обновление информации в модальном окне
const updateModalContent = () => {
    // Получение количества определенного товара
    const countRoseFn = countOccurrences(order, 'Розы');
    const countPeoniesFn = countOccurrences(order, 'Пионы');
    const countTulipsFn = countOccurrences(order, 'Тюльпаны');
    const countRomashkiFn = countOccurrences(order, 'Ромашки');
    // Подсчет итоговой суммы
    totalPriceValue = countRoseFn * priceRose +
        countPeoniesFn * pricePeony +
        countTulipsFn * priceTulip +
        countRomashkiFn * priceRomashki;
    if (totalPriceValue !== 0) {
        countTittle.textContent = 'Количество товаров'
        totalPrice.textContent = `Итоговая сумма: ${totalPriceValue} руб`;
        totalItems.innerHTML = `
            ${countRoseFn !== 0 ? `Розы: ${countRoseFn} <br>` : ''}
            ${countPeoniesFn !== 0 ? `Пионы: ${countPeoniesFn} <br>` : ''}
            ${countTulipsFn !== 0 ? `Тюльпаны: ${countTulipsFn} <br>` : ''}
            ${countRomashkiFn !== 0 ? `Ромашки: ${countRomashkiFn} <br>` : ''}
        `
        orderButton.style.display = 'block'
        cleanCartBtn.style.display = 'flex'
    }
    else {
        countTittle.textContent = 'Корзина пустая, добавьте товары в корзину'
        totalPrice.textContent = ''
        totalItems.textContent = ''
        orderButton.style.display = 'none'
        cleanCartBtn.style.display = 'none'
    }
}

// Обновление информации в модальном окне при клике на кнопку "Корзина"
cart.addEventListener('click', () => {
    updateModalContent();
    openModal();
});

// Обработчик события на кнопку "очистить корзину"
cleanCartBtn.addEventListener('click', () => {
    order.splice(0, order.length);
    onChange();
    updateModalContent();
})

// Закрытие модального окна при нажатии на esc
const handleKeyPress = (event) => {
    if (event.keyCode === 27) { // 27 соответствует клавише Esc
        closeModal();
    }
}
document.addEventListener('keydown', handleKeyPress);

// Закрытие модального окна при вне области модального окна
modal.addEventListener('click', (e) => {
    if(e.target.currentTarget === e.target) closeModal()
})

// Закрытие модального окна
modal.addEventListener('click', (e) => {
    if (e.target === modal || (e.target === modalContent && !modalContent.contains(e.relatedTarget))) {
        closeModal();
    }
});
