let order = []
const addToCart = (item) => {
    order.push(item.toLowerCase())
}

module.exports = {addToCart, order};