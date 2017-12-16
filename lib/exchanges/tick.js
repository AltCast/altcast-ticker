module.exports = class Tick {
    constructor(ticker) {
        this.pair = ticker.pair
        this.last_price = ticker.last_price
        this.volume = ticker.volume
        this.high = ticker.high
        this.low = ticker.low
        this.daily_percent = ticker.daily_percent
    }

    toString() {
        return JSON.stringify(this)
    }
}
