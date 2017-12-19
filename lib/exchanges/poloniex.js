let Exchange = require('./exchange')
let Poloniex = require('poloniex-api-node')
let Tick = require('./tick')
let _ = require('lodash')

module.exports = class PoloniexExchange extends Exchange {
    constructor(config, pipe) {
        super(config, pipe)

        this.name = 'POLONIEX'
        this.pair = this.asset + '_' + this.currency

        this.poloniex = new Poloniex()

        this.poloniex.returnTicker()
            .then((ticker) => {
                console.log('Ticker => ', ticker)
            })
    }

    authenticated() {
        console.log('Auth success on ', this.name)
    }

    open() {
        console.log('Open!')
        // TODO: Subscribe to order book and trades
    } 

    message(channel, data, seq) {
        console.log(channel, data)
        if (channel === 'ticker') {
            console.log('POLO Ticker => ', data)
        } else {
            console.log('OTHER MESSAGE', data)
        }
    }

    ticker(pair, ticker) {
        let channel = `${this.name}_TICKER_${this.pair}`
        console.log('Publishing on channel: ', channel)
        let tick = new Tick({
            pair: this.pair,
            last_price: ticker.LAST_PRICE,
            volume: ticker.VOLUME,
            high: ticker.HIGH,
            low: ticker.LOW,
            daily_percent: ticker.DAILY_CHANGE_PERC
        })

        this.lastTick = tick
        this.pipe.publish(channel, tick.toString())
    }
}

