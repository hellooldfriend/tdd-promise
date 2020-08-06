function noop() {}


class MyPromise {
    constructor(executor) {
        this.queue = []
        this.handleError = noop
        this.handleFinally = noop

        try {
            executor.call(null, this.onResolve.bind(this), this.onReject.bind(this))
        } catch(error) {
            this.handleError(error)
        } finally {
            this.handleFinally()
        }

    }

    onResolve(data) {
        this.queue.forEach(callback => {
            data = callback(data)
        })

        this.handleFinally()
    }

    onReject(error) {
        this.handleError(error)
        this.handleFinally()
    }

    then(fn) {
        this.queue.push(fn)
        return this
    }

    catch(fn) {
        this.handleError = fn
        return this
    }

    finally(fn) {
        this.handleFinally = fn
        return this
    }
}

module.exports = MyPromise