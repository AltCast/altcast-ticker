let Exchange = require('./exchange')
let Poloniex = require('poloniex-api-node')
let Tick = require('./tick')
let _ = require('lodash')
let Promise = require('bluebird')

module.exports = class PoloniexExchange extends Exchange {
    constructor(config, pairs, pipe) {
        super(config, pairs, pipe)

        this.name = 'POLONIEX'
        this.poloniex = new Poloniex()
        this.schedule()
    }

    cleanPair(pair) {
        return pair.currency + '_' + pair.asset
    }

    getTicker() {
        let watching = _.map(this.pairs, (pair) => {
            return `${pair.currency}_${pair.name}`
        })

        return this.poloniex.returnTicker()
            .then((tickers) => {
                let pairs = _.chain(tickers)
                    .keys()
                    .filter((pair) => {
                        return watching.indexOf(pair) > -1
                    })
                    .value()

                return _.map(pairs, (p) => {
                    let ticker = tickers[p]
                    let pair = _.find(this.pairs, { 'pair': p })

                    pair.last_price = parseFloat(ticker.last)
                    pair.volume = parseFloat(ticker.quoteVolume)
                    pair.high = parseFloat(ticker.high24hr)
                    pair.low = parseFloat(ticker.low24hr)
                    pair.daily_percent = parseFloat(ticker.percentChange)

                    return pair
                })
            })
            .then((tickers) => {
                tickers.forEach((ticker) => this.ticker(ticker.pair, ticker))
            })
    }

    schedule() {
        this.interval = setInterval(this.getTicker.bind(this), this.timer)
    }

    ticker(pair, tick) {
        let channel = `${this.name}_TICKER_${pair}`
        console.log('Publishing on channel: ', channel)

        this.lastTick = tick
        this.pipe.publish(channel, tick.toString())
    }
}

