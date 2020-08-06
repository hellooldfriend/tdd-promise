const MyPromise = require('./promise')

describe('MyPromise', () => {
    let promise
    let magic

    const successResult = 42
    const errorResult = 'I am error'

    beforeEach(() => {
        magic = jest.fn(resolve => setTimeout(() => resolve(successResult), 150))
        promise = new MyPromise(magic)
    })

    test('Should exists and to be typeof function', () => {
        expect(MyPromise).toBeDefined()
        expect(typeof MyPromise).toBe('function')
    })

    test('Should have methods: then, catch, finally', () => {
        expect(promise.then).toBeDefined()
        expect(promise.catch).toBeDefined()
        expect(promise.finally).toBeDefined()
    })

    test('Should call executor function', () => {
        expect(magic).toHaveBeenCalled()
    })

    test('Should get data in then block and chain them', async () => {
        const result = await promise.then(num => num).then(num => num * 2)
        expect(result).toBe(successResult * 2)
    })

    test('Should catch error', () => {
        const errorExecutor = (_, reject) => setTimeout(() => reject(errorResult), 150)
        const errorPromise = new MyPromise(errorExecutor)

        return new Promise(resolve  => {
            errorPromise.catch(error => {
                expect(error).toBe(errorResult)
                resolve()
            })
        })
    })

    test('Should call finally method', async () => {
        const finallySpy = jest.fn(() => {})
        await promise.finally(finallySpy)

        expect(finallySpy).toHaveBeenCalled()
    })
})