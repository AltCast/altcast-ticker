let redis = require('redis')
let inputExchanges = process.env.EXCHANGES
let exchangeList = {
    'BITFINEX': './lib/exchanges/bitfinex'
}
let http = require('http')
let _ = require('lodash')

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

let publisher = redis.createClient({
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379
})

let pairs = _.chain(inputExchanges.split(','))
    .map((exchangePair) => {
        let data = exchangePair.trim().split('_')
        let exchange = data[0]
        let asset = data[1]
        let currency = data[2]

        return {
            exchange: exchange,
            asset: asset,
            currency: currency
        }
    })
    .groupBy('exchange')
    .value()

let exchanges = _.chain(pairs)
    .keys()
    .map((exchange) => {
        if (!exchangeList[exchange]) throw new Error(`Invalid exchange ${exchange}`)

        let Exchange = require(exchangeList[exchange])

        console.log(`Listening on ${exchange}`)

        let data = pairs[exchange]

        console.log('DATA => ', data)

        return new Exchange({
            auth: false
        }, data, publisher)
    })
    .value()

//console.log(exchanges)

/*

    })

*/

http.createServer((req, res) => {
    let data = exchanges.map((exchange) => exchange.toJSON())

    let payload = JSON.stringify(data)

    console.log(payload)

    res.end(payload)
}).listen(process.env.HTTP_PORT)
