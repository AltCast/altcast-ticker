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

let exchanges = inputExchanges
    .split(',')
    .map((exchangePair) => {
        let data = exchangePair.trim().split('_')
        let exchange = data[0]
        let asset = data[1]
        let currency = data[2]

        console.log(`Listening on ${exchange} for ${asset}/${currency} pair`)

        if (!exchangeList[exchange]) throw new Error(`Invalid exchange ${exchange}`)

        let Exchange = require(exchangeList[exchange])

        return new Exchange({
            auth: false,
            asset: asset,
            currency: currency
        }, publisher)
    })


http.createServer((req, res) => {
    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');

    if ( req.method === 'OPTIONS' ) {
        res.writeHead(200);
        res.end();
        return;
    }

    let data = _.chain(exchanges)
        .map((exchange) => {
            return {
                name: exchange.name,
                pair: exchange.asset + '/' + exchange.currency,
                lastTick: exchange.lastTick
            }
        }).groupBy('name')
        .value()

    let payload = JSON.stringify(data)

    console.log(payload)

    res.end(payload)
}).listen(process.env.HTTP_PORT || 4000)
