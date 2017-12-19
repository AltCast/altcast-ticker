let MAX_TICKER_CACHE = 50
let Exchange = require('./exchange')
let Bitfinex = require("bitfinex-api-node")
let Tick = require('./tick')
let _ = require('lodash')

module.exports = class BitfinexExchange extends Exchange {
    constructor(config, pairs, pipe) {
        super(config, pairs, pipe)

        this.name = 'BITFINEX'
        this.bitfinex = new Bitfinex(this.key, this.secret, { version: 2, transform: true }).ws

        this.bitfinex.on('auth', () => this.authenticated())
        this.bitfinex.on('open', () => this.open())
        this.bitfinex.on('error', (err) => this.error(err))
        this.bitfinex.on('ticker', (pair, ticker) => this.ticker(pair, ticker))
    }

    authenticated() {
        console.log('Auth success on ', this.name)
    }

    open() {
        // TODO: Subscribe to order book and trades
        let pairs = _.map(this.pairs, 'pair')
        _.each(pairs, (pair) => {
            console.log('Subscribing to ', pair)
            this.bitfinex.subscribeTicker(pair)
        })

        if (this.auth) {
            this.bitfinex.auth()
        }
    }

    cleanTickerPair(pair) {
        return pair.replace('t', '')
    }

    storeTick(pair, tick) {
        let data = _.find(this.pairs, {'pair': pair})

        // Merge mutates the stored pair
        _.merge(data, tick)
    }

    ticker(pair, ticker) {
        pair = this.cleanTickerPair(pair)
        let channel = `${this.name}_TICKER_${pair}`
        console.log('Publishing on channel: ', channel)
        let tick = new Tick({
            pair: pair,
            last_price: ticker.LAST_PRICE,
            volume: ticker.VOLUME,
            high: ticker.HIGH,
            low: ticker.LOW,
            daily_percent: ticker.DAILY_CHANGE_PERC
        })

        this.storeTick(pair, tick)
        this.pipe.publish(channel, tick.toString())
    }
}
