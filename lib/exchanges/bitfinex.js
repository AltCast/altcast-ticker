/* All credits to gekko
 * https://github.com/askmike/gekko/
 */

let Exchange = require('./exchange')
let Bitfinex = require("bitfinex-api-node")
let _ = require('lodash')
let moment = require('moment')

module.exports = class BitfinexExchange extends Exchange {
    constructor(config, pipe) {
        super(config, pipe)

        this.name = 'Bitfinex'
        this.bitfinex = new Bitfinex(this.key, this.secret, { version: 2, transform: true }).ws

        this.bitfinex.on('auth', () => this.authenticated())
        this.bitfinex.on('open', () => this.open())
        this.bitfinex.on('ticker', (pair, ticker) => this.ticker(pair, ticker))
    }

    authenticated() {
        console.log('Auth success on ', this.name)
    }

    open() {
        // TODO: Subscribe to order book and trades
        this.bitfinex.subscribeTicker(this.pair)
        if (this.auth) {
            this.bitfinex.auth()
        }
    }

    ticker(pair, ticker) {
        console.log(pair, ticker)

        this.pipe.publish({
            pair: pair,
            last_price: ticker.LAST_PRICE,
            volume: ticker.VOLUME,
            high: ticker.HIGH,
            low: ticker.LOW,
            daily_percent: ticker.DAILY_CHANGE_PERC
        })
    }
}
