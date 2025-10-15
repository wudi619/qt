const envList = {
  dev: {
    // 当前平台
    VITE_APP_ENV: 'dev',
    // 默认主题 light dark
    VITE_APP_PLEATFORM_THEME: 'light',

    // API
    VITE_APP_BASE_API: 'https://api2.ok6.cc',
    // STATIC API
    VITE_APP_STATIC_API: 'https://static.ok6.cc',
    // WSS
    VITE_APP_BASE_WSS: 'wss://api2.ok6.cc',

    // 完整标题
    VITE_APP_META_TITLE: 'DEV_TITLE',
    // 交易所名称
    VITE_APP_EXCHANGE_NAME: 'DEV',
    // 缩写标题
    VITE_APP_META_TITLE_SUB: 'DEV_TITLE_SUB',
    // 关键字
    VITE_APP_META_KEYWORDS: 'DEV_KEYWORDS',
    // 描述
    VITE_APP_META_DESCRIPTION: 'DEV_DESCRIPTION'

    // H5 URL
    // VITE_APP_PLANFORM_H5: '',
    // PC URL
    // VITE_APP_PLANFORM_PC: ''
  },
  dev_dark: {
    VITE_APP_ENV: 'dev_dark',
    VITE_APP_PLEATFORM_THEME: 'dark',

    VITE_APP_BASE_API: 'https://api2.ok6.cc',
    VITE_APP_BASE_WSS: 'wss://api2.ok6.cc',

    VITE_APP_META_TITLE: 'DEV_Dark',
    VITE_APP_EXCHANGE_NAME: 'DEV_Dark',
    VITE_APP_META_TITLE_SUB: 'DEV_Dark',
    VITE_APP_META_KEYWORDS: 'DEV_Dark_KEYWORDS',
    VITE_APP_META_DESCRIPTION: 'DEV_Dark_DESCRIPTION'
  },
  asus: {
    VITE_APP_ENV: 'asus',
    VITE_APP_PLEATFORM_THEME: 'light',

    VITE_APP_BASE_API: 'https://api2.ok6.cc',
    VITE_APP_BASE_WSS: 'wss://api2.ok6.cc',

    VITE_APP_META_TITLE: 'ASUS',
    VITE_APP_EXCHANGE_NAME: 'ASUS',
    VITE_APP_META_TITLE_SUB: 'ASUS',
    VITE_APP_META_KEYWORDS: 'ASUS',
    VITE_APP_META_DESCRIPTION: 'ASUS'
  },
  etfinex: {
    VITE_APP_ENV: 'etfinex',
    VITE_APP_PLEATFORM_THEME: 'light',

    VITE_APP_META_TITLE: 'EtFinex',
    VITE_APP_EXCHANGE_NAME: 'EtFinex',
    VITE_APP_META_TITLE_SUB: 'EtFinex',
    VITE_APP_META_KEYWORDS: 'EtFinex投資 EtFinexデジタル通貨 EtFinexスマートコントラクト',
    VITE_APP_META_DESCRIPTION:
      'バイナンス暗号資産取引所 - EtFinexおよびアルトコインの世界最大の取引量を持つ取引所。'
  },

  kabit: {
    VITE_APP_ENV: 'kabit',
    VITE_APP_PLEATFORM_THEME: 'light',

    VITE_APP_META_TITLE: 'Cvcdoin',
    VITE_APP_EXCHANGE_NAME: 'Cvcdoin',
    VITE_APP_META_TITLE_SUB: 'Cvcdoin',
    VITE_APP_META_KEYWORDS: 'Cvcdoin投資 Cvcdoinデジタル通貨 Cvcdoinスマートコントラクト',
    VITE_APP_META_DESCRIPTION:
      'Cvcdoinは、既存のブロックチェーン間の限定的な運用性という差し迫った問題を解決しつつ、独自のアプリケーションを扱うことを目的とした革新的な多層ブロックチェーンプラットフォームです。これは、カスタムブロックチェーンアーキテクチャをサポートし、クロスチェーンの相互運用性を提供します。'
  },

  tokencan: {
    VITE_APP_ENV: 'tokencan',
    VITE_APP_PLEATFORM_THEME: 'light',

    VITE_APP_META_TITLE: 'Tokencan',
    VITE_APP_EXCHANGE_NAME: 'Tokencan',
    VITE_APP_META_TITLE_SUB: 'Tokencan',
    VITE_APP_META_KEYWORDS: 'Tokencan',
    VITE_APP_META_DESCRIPTION: 'Tokencan'
  },
  dentcoin: {
    VITE_APP_ENV: 'dentcoin',
    VITE_APP_PLEATFORM_THEME: 'light',

    VITE_APP_META_TITLE: 'Dentcoin',
    VITE_APP_EXCHANGE_NAME: 'Dentcoin',
    VITE_APP_META_TITLE_SUB: 'Dentcoin',
    VITE_APP_META_KEYWORDS: 'Dentcoin',
    VITE_APP_META_DESCRIPTION: 'Dentcoin'
  },
  paxpay: {
    VITE_APP_ENV: 'paxpay',
    VITE_APP_PLEATFORM_THEME: 'light',

    VITE_APP_META_TITLE: 'Paxpay',
    VITE_APP_EXCHANGE_NAME: 'Paxpay',
    VITE_APP_META_TITLE_SUB: 'Paxpay',
    VITE_APP_META_KEYWORDS: 'Paxpay',
    VITE_APP_META_DESCRIPTION: 'Paxpay'
  },
  bitmake: {
    VITE_APP_ENV: 'bitmake',
    VITE_APP_PLEATFORM_THEME: 'dark',

    VITE_APP_META_TITLE: 'BitExCrypto',
    VITE_APP_EXCHANGE_NAME: 'BitExCrypto',
    VITE_APP_META_TITLE_SUB: 'BitExCrypto',
    VITE_APP_META_KEYWORDS: 'BitExCrypto',
    VITE_APP_META_DESCRIPTION: 'BitExCrypto'
  },
  ebc: {
    VITE_APP_ENV: 'ebc',
    VITE_APP_PLEATFORM_THEME: 'dark',

    VITE_APP_META_TITLE: 'EBC',
    VITE_APP_EXCHANGE_NAME: 'EBC',
    VITE_APP_META_TITLE_SUB: 'EBC',
    VITE_APP_META_KEYWORDS: 'EBC',
    VITE_APP_META_DESCRIPTION: 'EBC'
  },
  gmdoin: {
    VITE_APP_ENV: 'gmdoin',
    VITE_APP_PLEATFORM_THEME: 'light',

    VITE_APP_META_TITLE: 'GMDoin',
    VITE_APP_EXCHANGE_NAME: 'GMDoin',
    VITE_APP_META_TITLE_SUB: 'GMDoin',
    VITE_APP_META_KEYWORDS: 'GMDOINです GMDOIN取引所です 仮想通貨GMDOINです 安定安全な取引所です',
    VITE_APP_META_DESCRIPTION:
      'GMDoin is a revolutionary multi-tiered blockchain platform that aims to both solve the pressing problem of limited operability between existing blockchains and handle its own applications. It supports custom blockchain architectures and provides cross-chain interoperability.'
  },
  gemini2: {
    VITE_APP_ENV: 'gemini2',
    VITE_APP_PLEATFORM_THEME: 'light',

    VITE_APP_META_TITLE: 'Robinhood',
    VITE_APP_EXCHANGE_NAME: 'Robinhood',
    VITE_APP_META_TITLE_SUB: 'Robinhood',
    VITE_APP_META_KEYWORDS: 'Robinhood',
    VITE_APP_META_DESCRIPTION: 'Robinhood'
  },
  coinmarketcap: {
    VITE_APP_ENV: 'coinmarketcap',
    VITE_APP_PLEATFORM_THEME: 'light',

    VITE_APP_META_TITLE: 'CoinMarketCap',
    VITE_APP_EXCHANGE_NAME: 'CoinMarketCap',
    VITE_APP_META_TITLE_SUB: 'CoinMarketCap',
    VITE_APP_META_KEYWORDS: 'CoinMarketCap',
    VITE_APP_META_DESCRIPTION: 'CoinMarketCap'
  },
  rxce: {
    VITE_APP_ENV: 'rxce',
    VITE_APP_PLEATFORM_THEME: 'dark',

    VITE_APP_META_TITLE: 'RXCE',
    VITE_APP_EXCHANGE_NAME: 'RXCE',
    VITE_APP_META_TITLE_SUB: 'RXCE',
    VITE_APP_META_KEYWORDS: 'RXCE',
    VITE_APP_META_DESCRIPTION: 'RXCE'
  },
  gmmoin: {
    VITE_APP_ENV: 'gmmoin',
    VITE_APP_PLEATFORM_THEME: 'light',

    VITE_APP_META_TITLE: 'CMDoin',
    VITE_APP_EXCHANGE_NAME: 'CMDoin',
    VITE_APP_META_TITLE_SUB: 'CMDoin',
    VITE_APP_META_KEYWORDS: 'CMDoin',
    VITE_APP_META_DESCRIPTION:
      'CMDoin is a revolutionary multi-tiered blockchain platform that aims to both solve the pressing problem of limited operability between existing blockchains.'
  },
  gmtoin: {
    VITE_APP_ENV: 'gmtoin',
    VITE_APP_PLEATFORM_THEME: 'light',

    VITE_APP_META_TITLE: 'MTGqsb',
    VITE_APP_EXCHANGE_NAME: 'MTGqsb',
    VITE_APP_META_TITLE_SUB: 'MTGqsb',
    VITE_APP_META_KEYWORDS: 'MTGqsb',
    VITE_APP_META_DESCRIPTION:
      'MTGqsb is a revolutionary multi-tiered blockchain platform that aims to both solve the pressing problem of limited operability between existing blockchains.'
  },
  coinang: {
    VITE_APP_ENV: 'coinang',
    VITE_APP_PLEATFORM_THEME: 'light',

    VITE_APP_META_TITLE: 'Coincmw',
    VITE_APP_EXCHANGE_NAME: 'Coincmw',
    VITE_APP_META_TITLE_SUB: 'Coincmw',
    VITE_APP_META_KEYWORDS: 'Coincmw',
    VITE_APP_META_DESCRIPTION:
      'Coincmw is a revolutionary multi-tiered blockchain platform that aims to both solve the pressing problem of limited operability between existing blockchains .'
  },
  gmtoin2: {
    VITE_APP_ENV: 'gmtoin2',
    VITE_APP_PLEATFORM_THEME: 'light',

    VITE_APP_META_TITLE: 'MIChskt',
    VITE_APP_EXCHANGE_NAME: 'MIChskt',
    VITE_APP_META_TITLE_SUB: 'MIChskt',
    VITE_APP_META_KEYWORDS: 'MIChist投資 MIChistデジタル通貨 MIChistスマートコントラクト',
    VITE_APP_META_DESCRIPTION:
      'MIChsktは既存のブロックチェーン間の限定的な運用性という差し迫った問題を解決しつつ、独自のアプリケーションを扱うことを目的とした革新的な多層ブロックチェーンプラットフォームです。これは、カスタムブロックチェーンアーキテクチャをサポートし、クロスチェーンの相互運用性を提供します。'
  },
  bitfly: {
    VITE_APP_ENV: 'bitfly',
    VITE_APP_PLEATFORM_THEME: 'light',

    VITE_APP_META_TITLE: 'BitFly',
    VITE_APP_EXCHANGE_NAME: 'BitFly',
    VITE_APP_META_TITLE_SUB: 'BitFly',
    VITE_APP_META_KEYWORDS: 'BitFly',
    VITE_APP_META_DESCRIPTION: 'BitFly'
  },
  bityc: {
    VITE_APP_ENV: 'bityc',
    VITE_APP_PLEATFORM_THEME: 'light',

    VITE_APP_META_TITLE: 'BITYC',
    VITE_APP_EXCHANGE_NAME: 'BITYC',
    VITE_APP_META_TITLE_SUB: 'BITYC',
    VITE_APP_META_KEYWORDS: 'BITYC',
    VITE_APP_META_DESCRIPTION: 'BITYC'
  },
  coinsexpto: {
    VITE_APP_ENV: 'coinsexpto',
    VITE_APP_PLEATFORM_THEME: 'dark',

    VITE_APP_META_TITLE: 'B.T.Expro',
    VITE_APP_EXCHANGE_NAME: 'B.T.Expro',
    VITE_APP_META_TITLE_SUB: 'B.T.Expro',
    VITE_APP_META_KEYWORDS:
      'B.T.Expro is a revolutionary multi-tiered blockchain platform that aims to both solve the pressing problem of limited operability between existing blockchains',
    VITE_APP_META_DESCRIPTION:
      'B.T.Expro is a revolutionary multi-tiered blockchain platform that aims to both solve the pressing problem of limited operability between existing blockchains'
  },
  hfm: {
    VITE_APP_ENV: 'hfm',
    VITE_APP_PLEATFORM_THEME: 'light',

    VITE_APP_META_TITLE: 'HFM',
    VITE_APP_EXCHANGE_NAME: 'HFM',
    VITE_APP_META_TITLE_SUB: 'HFM',
    VITE_APP_META_KEYWORDS: 'HFM',
    VITE_APP_META_DESCRIPTION: 'HFM'
  },
  latcoin: {
    VITE_APP_ENV: 'latcoin',
    VITE_APP_PLEATFORM_THEME: 'light',

    VITE_APP_META_TITLE: 'LatCoin',
    VITE_APP_EXCHANGE_NAME: 'LatCoin',
    VITE_APP_META_TITLE_SUB: 'LatCoin',
    VITE_APP_META_KEYWORDS: 'LatCoin',
    VITE_APP_META_DESCRIPTION: 'LatCoin'
  },
  cmwoin: {
    VITE_APP_ENV: 'cmwoin',
    VITE_APP_PLEATFORM_THEME: 'light',

    VITE_APP_META_TITLE: 'Bxmcio',
    VITE_APP_EXCHANGE_NAME: 'Bxmcio',
    VITE_APP_META_TITLE_SUB: 'Bxmcio',
    VITE_APP_META_KEYWORDS:
      'Bxmcio is a revolutionary multi-tiered blockchain platform that aims to both solve the pressing problem of limited operability between existing blockchains.',
    VITE_APP_META_DESCRIPTION:
      'Bxmcio is a revolutionary multi-tiered blockchain platform that aims to both solve the pressing problem of limited operability between existing blockchains.'
  },
  idsst: {
    VITE_APP_ENV: 'idsst',
    VITE_APP_PLEATFORM_THEME: 'light',

    VITE_APP_META_TITLE: 'IDSST',
    VITE_APP_EXCHANGE_NAME: 'IDSST',
    VITE_APP_META_TITLE_SUB: 'IDSST',
    VITE_APP_META_KEYWORDS: 'IDSST',
    VITE_APP_META_DESCRIPTION: 'IDSST'
  },
  trustwallet: {
    VITE_APP_ENV: 'trustwallet',
    VITE_APP_PLEATFORM_THEME: 'light',

    VITE_APP_META_TITLE: 'TrustWallet',
    VITE_APP_EXCHANGE_NAME: 'TrustWallet',
    VITE_APP_META_TITLE_SUB: 'TrustWallet',
    VITE_APP_META_KEYWORDS: 'TrustWallet',
    VITE_APP_META_DESCRIPTION: 'TrustWallet'
  },
  das: {
    VITE_APP_ENV: 'das',
    VITE_APP_PLEATFORM_THEME: 'light',

    VITE_APP_META_TITLE: 'DAS',
    VITE_APP_EXCHANGE_NAME: 'DAS',
    VITE_APP_META_TITLE_SUB: 'DAS',
    VITE_APP_META_KEYWORDS: 'DAS',
    VITE_APP_META_DESCRIPTION: 'DAS'
  },
  fx: {
    VITE_APP_ENV: 'fx',
    VITE_APP_PLEATFORM_THEME: 'dark',

    VITE_APP_META_TITLE: 'コイン',
    VITE_APP_EXCHANGE_NAME: 'コイン',
    VITE_APP_META_TITLE_SUB: 'コイン',
    VITE_APP_META_KEYWORDS: 'コイン',
    VITE_APP_META_DESCRIPTION: 'コイン'
  },
  dex: {
    VITE_APP_ENV: 'dex',
    VITE_APP_PLEATFORM_THEME: 'dark',

    VITE_APP_META_TITLE: 'DEX',
    VITE_APP_EXCHANGE_NAME: 'DEX',
    VITE_APP_META_TITLE_SUB: 'DEX',
    VITE_APP_META_KEYWORDS: 'DEX',
    VITE_APP_META_DESCRIPTION: 'DEX'
  },
  aams: {
    VITE_APP_ENV: 'aams',
    VITE_APP_PLEATFORM_THEME: 'light',

    VITE_APP_META_TITLE: 'AAMS',
    VITE_APP_EXCHANGE_NAME: 'AAMS',
    VITE_APP_META_TITLE_SUB: 'AAMS',
    VITE_APP_META_KEYWORDS: 'AAMS',
    VITE_APP_META_DESCRIPTION: 'AAMS'
  },
  coolcoinex: {
    VITE_APP_ENV: 'coolcoinex',
    VITE_APP_PLEATFORM_THEME: 'dark',

    VITE_APP_META_TITLE: 'TicBit',
    VITE_APP_EXCHANGE_NAME: 'TicBit',
    VITE_APP_META_TITLE_SUB: 'TicBit',
    VITE_APP_META_KEYWORDS: 'TicBit',
    VITE_APP_META_DESCRIPTION: 'TicBit'
  },
  bitbyex: {
    VITE_APP_ENV: 'bitbyex',
    VITE_APP_PLEATFORM_THEME: 'light',

    VITE_APP_META_TITLE: 'Bitbyex',
    VITE_APP_EXCHANGE_NAME: 'Bitbyex',
    VITE_APP_META_TITLE_SUB: 'Bitbyex',
    VITE_APP_META_KEYWORDS: 'Bitbyex',
    VITE_APP_META_DESCRIPTION:
      'Bitbyex is the longest-running and most liquid major cryptocurrency exchange. Founded in 2013,An exchange affiliated to BIT Group. it has become the go-to platform for traders & institutional.'
  },
  bkfcoin: {
    VITE_APP_ENV: 'bkfcoin',
    VITE_APP_PLEATFORM_THEME: 'light',

    VITE_APP_META_TITLE: 'BKFcoin',
    VITE_APP_EXCHANGE_NAME: 'BKFcoin',
    VITE_APP_META_TITLE_SUB: 'BKFcoin',
    VITE_APP_META_KEYWORDS: 'BKFcoin',
    VITE_APP_META_DESCRIPTION:
      'BKFcoin is a revolutionary multi-tiered blockchain platform that aims to both solve the pressing problem of limited operability between existing blockchains .'
  },
  math: {
    VITE_APP_ENV: 'math',
    VITE_APP_PLEATFORM_THEME: 'dark',

    VITE_APP_META_TITLE: 'MATH',
    VITE_APP_EXCHANGE_NAME: 'MATH',
    VITE_APP_META_TITLE_SUB: 'MATH',
    VITE_APP_META_KEYWORDS: 'MATH',
    VITE_APP_META_DESCRIPTION: 'MATH'
  },
  hfm2: {
    VITE_APP_ENV: 'hfm2',
    VITE_APP_PLEATFORM_THEME: 'dark',

    VITE_APP_META_TITLE: 'HFM',
    VITE_APP_EXCHANGE_NAME: 'HFM',
    VITE_APP_META_TITLE_SUB: 'HFM',
    VITE_APP_META_KEYWORDS: 'HFM',
    VITE_APP_META_DESCRIPTION: 'HFM'
  },
  gatedefi: {
    VITE_APP_ENV: 'gatedefi',
    VITE_APP_PLEATFORM_THEME: 'light',

    VITE_APP_META_TITLE: 'Gate-defi',
    VITE_APP_EXCHANGE_NAME: 'Gate-defi',
    VITE_APP_META_TITLE_SUB: 'Gate-defi',
    VITE_APP_META_KEYWORDS: 'Gate-defi',
    VITE_APP_META_DESCRIPTION: 'Gate-defi'
  },
  spark: {
    VITE_APP_ENV: 'spark',
    VITE_APP_PLEATFORM_THEME: 'dark',

    VITE_APP_META_TITLE: 'Spark',
    VITE_APP_EXCHANGE_NAME: 'Spark',
    VITE_APP_META_TITLE_SUB: 'Spark',
    VITE_APP_META_KEYWORDS: 'Spark',
    VITE_APP_META_DESCRIPTION: 'Spark'
  },
  asus_dark: {
    VITE_APP_ENV: 'asus_dark',
    VITE_APP_PLEATFORM_THEME: 'dark',

    VITE_APP_BASE_API: 'https://api2.ok6.cc',
    VITE_APP_BASE_WSS: 'wss://api2.ok6.cc',

    VITE_APP_META_TITLE: 'asus_dark',
    VITE_APP_EXCHANGE_NAME: 'asus_dark',
    VITE_APP_META_TITLE_SUB: 'asus_dark',
    VITE_APP_META_KEYWORDS: 'asus_dark_KEYWORDS',
    VITE_APP_META_DESCRIPTION: 'asus_dark_DESCRIPTION'
  },
  asus_light: {
    VITE_APP_ENV: 'asus_light',
    VITE_APP_PLEATFORM_THEME: 'light',

    VITE_APP_BASE_API: 'https://api2.ok6.cc',
    VITE_APP_BASE_WSS: 'wss://api2.ok6.cc',

    VITE_APP_META_TITLE: 'asus_light',
    VITE_APP_EXCHANGE_NAME: 'asus_light',
    VITE_APP_META_TITLE_SUB: 'asus_light',
    VITE_APP_META_KEYWORDS: 'asus_light_KEYWORDS',
    VITE_APP_META_DESCRIPTION: 'asus_light_DESCRIPTION'
  },
  robinhood2: {
    VITE_APP_ENV: 'robinhood2',
    VITE_APP_PLEATFORM_THEME: 'light',

    VITE_APP_META_TITLE: 'robinhood',
    VITE_APP_EXCHANGE_NAME: 'robinhood',
    VITE_APP_META_TITLE_SUB: 'robinhood',
    VITE_APP_META_KEYWORDS: 'robinhood',
    VITE_APP_META_DESCRIPTION: 'robinhood'
  },
}

module.exports = { envList }
