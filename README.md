# AltCast Ticker

It receives a list of exchanges and currency pairs, subscribes to semi-realtime ticker updates and publishes to redis pub/sub

It listens on HTTP port (defined in env var `HTTP_PORT`) and prints out all exchanges pairs it is currently listening to

## Installing

```bash
npm install --production
```

## Running

Example run:

```bash
export HTTP_PORT=8001
export REDIS_HOST=localhost
export REDIS_PORT=6379
export EXCHANGES=BITFINEX_BTC_USD
export EXCHANGES=$EXCHANGES:BITFINEX_LTC_USD
export EXCHANGES=$EXCHANGES:BITFINEX_IOT_USD

npm start
```

## Docs

It will publish tickers on a redis channel on the format `EXCHANGE_ASSET_CURRENCY` with the tick as message, example:

```
Channel: BITFINEX_BTC_USD
Message: {
  "pair": "BTCUSD",
  "last_price": 18681,
  "volume": 43701.40722192,
  "high": 18900,
  "low": 17050,
  "daily_percent": 0.0558
}
```
