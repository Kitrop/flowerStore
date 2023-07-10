const {addToCart, order, deleteFromCart} = require('./addToCart')

describe('добавление в корзину', () => {

    const testCases = [
        {
            in: 'Роза',
            expect: ['Роза']
        },
        {
            in: 'Пиона',
            expect: ['Пиона']
        },
        {
            in: 1,
            expect: [1]
        },
    ]
    testCases.forEach(test => {
        beforeEach(() => {
            order.length = 0
        })
        it(`in: ${test.in}  out: ${test.expect}`, () => {
            const item = 'Роза'
            addToCart(item)
            expect(order).toContain('роза')
        })
    })
})

describe('удаление из корзины', () => {
    test('удаление розы из корзины', () => {
        const item = 'роза'
        deleteFromCart(item)
        expect(order).toEqual(['роза', 'тест', 'тюльпан'])
    })
})

