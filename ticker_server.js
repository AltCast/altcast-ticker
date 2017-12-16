let redis = require('redis')
let inputExchanges = process.env.EXCHANGES
let exchangeList = {
    'BITFINEX': './lib/exchanges/bitfinex'
}

if (!inputExchanges) {
    console.error(`
        You must set at least one exchange and PAIR on EXCHANGES env variable.
        Example:

        export EXCHANGES=BITFINEX_BTC_USD
        export EXCHANGES=$EXCHANGES;BITFINEX_LTC_USD
        export EXCHANGES=$EXCHANGES;POLONIEX_BTC_USD
    `)

    throw new Error('No exchanges defined.')
}

let publisher = redis.createClient()

let exchanges = inputExchanges
    .split(',')
    .map((exchangePair) => {
        let data = exchangePair.trim().split('_')
        let exchange = data[0]
        let asset = data[1]
        let currency = data[2]

        console.log(asset, currency)

        if (!exchangeList[exchange]) throw new Error(`Invalid exchange ${exchange}`)

        let Exchange = require(exchangeList[exchange])

        return new Exchange({
            auth: false,
            asset: asset,
            currency: currency
        }, publisher)
    })
