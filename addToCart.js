let order = ['роза', 'тест', 'тюльпан', 'роза']
const addToCart = (item) => {
    order.push(item.toLowerCase())
}

const deleteFromCart = (item) => {
    const indexItem = order.slice().reverse().findIndex((element) => element === item);
    if (indexItem !== -1) {
        order.splice(order.length - 1 - indexItem, 1);
        console.log(order + ' ' + item)
    }
}



module.exports = {addToCart, order, deleteFromCart};