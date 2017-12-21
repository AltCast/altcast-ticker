let data = {
        currencies: ['BTC', 'ETH', 'XMR', 'USDT'],
    assets: [
      '1CR', 'ABY', 'AC', 'ACH', 'ADN', 'AEON', 'AERO', 'AIR', 'AMP', 'APH',
      'ARCH', 'AUR', 'AXIS', 'BALLS', 'BANK', 'BBL', 'BBR', 'BCC', 'BCH', 'BCN',
      'BCY', 'BDC', 'BDG', 'BELA', 'BITCNY', 'BITS', 'BITUSD', 'BLK', 'BLOCK',
      'BLU', 'BNS', 'BONES', 'BOST', 'BTC', 'BTCD', 'BTCS', 'BTM', 'BTS',
      'BURN', 'BURST', 'C2', 'CACH', 'CAI', 'CC', 'CCN', 'CGA', 'CHA', 'CINNI',
      'CLAM', 'CNL', 'CNMT', 'CNOTE', 'COMM', 'CON', 'CORG', 'CRYPT', 'CURE',
      'CYC', 'DAO', 'DASH', 'DCR', 'DGB', 'DICE', 'DIEM', 'DIME', 'DIS', 'DNS',
      'DOGE', 'DRKC', 'DRM', 'DSH', 'DVK', 'EAC', 'EBT', 'ECC', 'EFL', 'EMC2',
      'EMO', 'ENC', 'ETC', 'ETH', 'eTOK', 'EXE', 'EXP', 'FAC', 'FCN', 'FCT',
      'FIBRE', 'FLAP', 'FLDC', 'FLO', 'FLT', 'FOX', 'FRAC', 'FRK', 'FRQ',
      'FVZ', 'FZ', 'FZN', 'GAME', 'GAP', 'GDN', 'GEMZ', 'GEO', 'GIAR', 'GLB',
      'GML', 'GNS', 'GNT', 'GOLD', 'GPC', 'GPUC', 'GRC', 'GRCX', 'GRS', 'GUE', 'H2O',
      'HIRO', 'HOT', 'HUC', 'HUGE', 'HVC', 'HYP', 'HZ', 'IFC', 'INDEX', 'IOC',
      'ITC', 'IXC', 'JLH', 'JPC', 'JUG', 'KDC', 'KEY', 'LBC', 'LC', 'LCL',
      'LEAF', 'LGC', 'LOL', 'LOVE', 'LQD', 'LSK', 'LTBC', 'LTC', 'LTCX',
      'MAID', 'MAST', 'MAX', 'MCN', 'MEC', 'METH', 'MIL', 'MIN', 'MINT', 'MMC',
      'MMNXT', 'MMXIV', 'MNTA', 'MON', 'MRC', 'MRS', 'MTS', 'MUN', 'MYR',
      'MZC', 'N5X', 'NAS', 'NAUT', 'NAV', 'NBT', 'NEOS', 'NL', 'NMC', 'NOBL',
      'NOTE', 'NOXT', 'NRS', 'NSR', 'NTX', 'NXT', 'NXTI', 'OMNI', 'OPAL',
      'PAND', 'PASC', 'PAWN', 'PIGGY', 'PINK', 'PLX', 'PMC', 'POT', 'PPC', 'PRC',
      'PRT', 'PTS', 'Q2C', 'QBK', 'QCN', 'QORA', 'QTL', 'RADS', 'RBY', 'RDD', 'REP',
      'RIC', 'RZR', 'SBD', 'SC', 'SDC', 'SHIBE', 'SHOPX', 'SILK', 'SJCX',
      'SLR', 'SMC', 'SOC', 'SPA', 'SQL', 'SRCC', 'SRG', 'SSD', 'STEEM', 'STR',
      'SUM', 'SUN', 'SWARM', 'SXC', 'SYNC', 'SYS', 'TAC', 'TOR', 'TRUST',
      'TWE', 'UIS', 'ULTC', 'UNITY', 'URO', 'USDE', 'USDT', 'UTC', 'UTIL',
      'UVC', 'VIA', 'VOOT', 'VOX', 'VRC', 'VTC', 'WC', 'WDC', 'WIKI', 'WOLF',
      'X13', 'XAI', 'XAP', 'XBC', 'XC', 'XCH', 'XCN', 'XCP', 'XCR', 'XDN',
      'XDP', 'XEM', 'XHC', 'XLB', 'XMG', 'XMR', 'XPB', 'XPM', 'XRP', 'XSI',
      'XST'
    ]
}

let exchanges = data.currencies.map((currency) => {
    return data.assets.map((asset) => {
        return `POLONIEX_${asset}_${currency}`
    })
})

console.log('export EXCHANGES=' + exchanges.join(','))
