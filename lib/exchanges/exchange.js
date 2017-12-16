module.exports = class Exchange {
    constructor(config, pipe) {
        this.key = config.key
        this.secret = config.secret
        this.balance
        this.price
        this.asset = config.asset
        this.currency = config.currency
        this.pair = this.asset + this.currency
        this.auth = config.auth
        this.pipe = pipe
    }

    authenticated() {
        console.log('Auth success on ', this.name)
    }
}
