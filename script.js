const roseAdd = document.querySelector('#rosa')
const pioniAdd = document.querySelector('#pioni')
const romashkiAdd = document.querySelector('#romashki')
const tulpaniAdd = document.querySelector('#tulpani')

const countCart = document.querySelector('#count')

const roseCrease = document.querySelector('#rosa_crease')
const pioniCrease = document.querySelector('#pioni_crease')
const romashkiCrease = document.querySelector('#romashki_crease')
const tulpaniCrease = document.querySelector('#tulpani_crease')

const countRose = document.querySelector('#countRose')
const countDaisies = document.querySelector('#countDaisies')
const countPeonies = document.querySelector('#countPeonies')
const countTulips = document.querySelector('#countTulips')

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

const flowers = {
    'Розы': { add: roseAdd, crease: roseCrease },
    'Тюльпаны': { add: tulpaniAdd, crease: tulpaniCrease },
    'Ромашки': { add: romashkiAdd, crease: romashkiCrease },
    'Пионы': { add: pioniAdd, crease: pioniCrease }
};


function countOccurrences(array, searchString) {
    let count = 0;
    for (const string of array) {
        if (string === searchString) {
            count++;
        }
    }
    return count;
}


const onChange = () => {
    for (const flower in flowers) {
        const { add, crease } = flowers[flower];
        if (order.includes(flower)) {
            add.style.display = 'none';
            crease.style.display = 'flex';
        }
        else {
            add.style.display = 'flex';
            crease.style.display = 'none';
        }
    }
    const countRoseFn = countOccurrences(order, 'Розы')
    const countPeoniesFn = countOccurrences(order, 'Пионы')
    const countTulipsFn = countOccurrences(order, 'Тюльпаны')
    const countDaisiesFn = countOccurrences(order, 'Ромашки')


    if (countRoseFn !== 0 ) {
        countRose.innerHTML = `Количество: ${countRoseFn}`
    }
    else if (countRoseFn === 0) {
        countRose.innerHTML = ''
    }

    if (countPeoniesFn !== 0 ) {
        countPeonies.innerHTML = `Количество: ${countPeoniesFn}`
    }
    else if (countPeoniesFn === 0) {
        countPeonies.innerHTML = ''
    }

    if (countTulipsFn !== 0 ) {
        countTulips.innerHTML = `Количество: ${countTulipsFn}`
    }
    else if (countTulipsFn === 0) {
        countTulips.innerHTML = ''
    }

    if (countDaisiesFn !== 0 ) {
        countDaisies.innerHTML = `Количество: ${countDaisiesFn}`
    }
    else if (countDaisiesFn === 0) {
        countDaisies.innerHTML = ''
    }

    countCart.innerHTML = `(${order.length})`
};


const order = createTrackedArray([], onChange);

const addToCart = (item) => {
    order.push(item)
}

const deleteFromCart = (item) => {
    const indexItem = order.findLastIndex( (element) => element === item)
    if (indexItem !== -1) {
        order.splice(indexItem, 1)
    }
}