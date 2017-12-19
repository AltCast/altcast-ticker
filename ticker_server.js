let STANDARD_TIMER = 5000
let redis = require('redis')
let inputExchanges = process.env.EXCHANGES
let exchangeList = {
    'BITFINEX': './lib/exchanges/bitfinex',
    'POLONIEX': './lib/exchanges/poloniex'
}
let http = require('http')
let _ = require('lodash')
let Poloniex = require('./lib/exchanges/poloniex')

if (!inputExchanges) {
    console.error(`
        You must set at least one exchange and PAIR on EXCHANGES env variable.
        Example:

        export EXCHANGES=BITFINEX_BTC_USD
        export EXCHANGES=$EXCHANGES:BITFINEX_LTC_USD
        export EXCHANGES=$EXCHANGES:POLONIEX_BTC_USD
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

console.log(pairs)

let exchanges = _.chain(pairs)
    .keys()
    .map((exchange) => {
        if (!exchangeList[exchange]) throw new Error(`Invalid exchange ${exchange}`)

        let Exchange = require(exchangeList[exchange])
        let data = pairs[exchange]

        console.log(`Listening on ${exchange}`)

        return new Exchange({
            auth: false,
            timer: STANDARD_TIMER
        }, data, publisher)
    })
    .value()

http.createServer((req, res) => {
    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');

    if (req.method === 'OPTIONS') {
        res.writeHead(200)
        res.end()
        return
    }

    let data = exchanges.map((exchange) => exchange.toJSON())
    let payload = JSON.stringify(data)

    res.end(payload)
}).listen(process.env.HTTP_PORT || 4000)
