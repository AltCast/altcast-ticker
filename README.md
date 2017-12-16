# AltCast Ticker

It receives a list of exchanges and currency pairs and subscribes to semi-realtime ticker updates

It listens on HTTP port (defined in env var `HTTP_PORT`) and prints out all exchanges pairs it is currently listening to

## Installing

```bash
npm install --production
```

## Running

Example run:

```bash
export EXCHANGES=BITFINEX_BTC_USD
export EXCHANGES=$EXCHANGES:BITFINEX_LTC_USD
export EXCHANGES=$EXCHANGES:BITFINEX_IOT_USD

npm start
```
