let _ = require('lodash')

module.exports = class Exchange {
    constructor(config, pairs, pipe) {
        this.key = config.key
        this.secret = config.secret
        this.balance
        this.price
        this.asset = config.asset
        this.currency = config.currency
        this.auth = config.auth
        this.pipe = pipe

        this.setPairs(pairs)
    }

    toJSON() {
        return {
            name: this.name,
            ticks: this.pairs
        }
    }

    setPairs(pairs) {
        this.pairs = _.map(pairs, (pair) => {
            return {
                name: pair.asset,
                currency: pair.currency,
                pair: pair.asset + pair.currency,
                last_price: -1,
                volume: -1,
                high: -1,
                low: -1,
                daily_percent: -1
            }
        })
    }

    error(err) {
        console.log(err)
    }

    authenticated() {
        console.log('Auth success on ', this.name)
    }
}
