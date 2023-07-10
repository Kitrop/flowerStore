const {addToCart, order} = require('./addToCart')

describe('добавление в корзину', () => {
    beforeEach(() => {
        order.length = 0
    })
    test('Добавление в корзину розы и проверка на регистр', () => {
        const item = 'Роза'
        addToCart(item)
        expect(order).toContain('роза')
    })
})