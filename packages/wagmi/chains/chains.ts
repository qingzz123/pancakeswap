import { rinkeby, mainnet, goerli } from 'wagmi/chains'
import { Chain } from 'wagmi'

export const avalandche: Chain = {
  id: 43114,
  name: 'Avalanche C-Chain',
  network: 'avalanche',
  rpcUrls: {
    default: 'https://rpc.ankr.com/avalanche',
  },
  nativeCurrency: { name: 'Avalanche', symbol: 'AVAX', decimals: 18 },
  blockExplorers: {
    default: {
      name: 'snowtrace',
      url: 'https://snowtrace.io/',
    },
  },
}

export const ploygon: Chain = {
  id: 137,
  name: 'Polygon Mainnet',
  network: 'polygon',
  rpcUrls: {
    default: 'https://polygon-rpc.com/',
  },
  nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
  blockExplorers: {
    default: {
      name: 'polygonscan',
      url: 'https://polygonscan.com',
    },
  },
}

export const optimism: Chain = {
  id: 10,
  name: 'Optimism',
  network: 'Optimism',
  rpcUrls: {
    default: 'https://mainnet.optimism.io/',
  },
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  blockExplorers: {
    default: {
      name: 'etherscan',
      url: 'https://optimistic.etherscan.io',
    },
  },
}

export const huobi: Chain = {
  id: 128,
  name: 'Huobi ECO Chain Mainnet',
  network: 'Heco',
  rpcUrls: {
    default: 'https://http-mainnet.hecochain.com',
  },
  nativeCurrency: { name: 'Huobi ECO Chain Native Token', symbol: 'HT', decimals: 18 },
  blockExplorers: {
    default: {
      name: 'hecoinfo',
      url: 'https://hecoinfo.com',
    },
  },
}

export const dogechain: Chain = {
  id: 2000,
  name: 'Dogechain Mainnet',
  network: 'DC',
  rpcUrls: {
    default: 'https://rpc-sg.dogechain.dog',
  },
  nativeCurrency: { name: 'Dogecoin', symbol: 'DOGE', decimals: 18 },
  blockExplorers: {
    default: {
      name: 'dogechain explorer',
      url: 'https://explorer.dogechain.dog',
    },
  },
}

export const okxChain: Chain = {
  id: 66,
  name: 'OKXChain Mainnet',
  network: 'okxchain',
  rpcUrls: {
    default: 'https://exchainrpc.okex.org',
  },
  nativeCurrency: { name: 'OKXChain Global Utility Token', symbol: 'OKT', decimals: 18 },
  blockExplorers: {
    default: {
      name: 'OKLink',
      url: 'https://www.oklink.com/en/okc',
    },
  },
}

export const mbkChain: Chain = {
  id: 12133,
  name: 'MBK Chain Mainnet',
  network: 'mbk',
  rpcUrls: {
    default: 'https://rpcm.mbkscan.com',
  },
  nativeCurrency: { name: 'MBK', symbol: 'MBK', decimals: 18 },
  blockExplorers: {
    default: {
      name: 'mbk',
      url: 'https://www.mbkscan.com/',
    },
  },
}

export const etcChain: Chain = {
  id: 61,
  name: 'Ethereum Classic Mainnet',
  network: 'ETC',
  rpcUrls: {
    default: 'https://www.ethercluster.com/etc',
  },
  nativeCurrency: { name: 'Ethereum Classic Ether', symbol: 'ETC', decimals: 18 },
  blockExplorers: {
    default: {
      name: 'blockscout',
      url: 'https://blockscout.com/etc/mainnet',
    },
  },
}

export const avalandcheFuji: Chain = {
  id: 43113,
  name: 'Avalanche Fuji',
  network: 'avalanche-fuji',
  rpcUrls: {
    default: 'https://rpc.ankr.com/avalanche_fuji',
  },
  nativeCurrency: { name: 'Avalanche', symbol: 'AVAX', decimals: 18 },
  blockExplorers: {
    default: {
      name: 'snowtrace',
      url: 'https://testnet.snowtrace.io/',
    },
  },
  testnet: true,
}

export const fantomOpera: Chain = {
  id: 250,
  name: 'Fantom Opera',
  network: 'fantom',
  nativeCurrency: { name: 'Fantom', symbol: 'FTM', decimals: 18 },
  rpcUrls: {
    default: 'https://rpc.ftm.tools',
  },
  blockExplorers: {
    default: {
      name: 'FTMScan',
      url: 'https://ftmscan.com',
    },
  },
}

export const fantomTestnet: Chain = {
  id: 4002,
  name: 'Fantom Testnet',
  network: 'fantom-testnet',
  nativeCurrency: { name: 'Fantom', symbol: 'FTM', decimals: 18 },
  rpcUrls: {
    default: 'https://rpc.testnet.fantom.network',
  },
  blockExplorers: {
    default: {
      name: 'FTMScan',
      url: 'https://testnet.ftmscan.com',
    },
  },
  testnet: true,
}

const bscExplorer = { name: 'BscScan', url: 'https://bscscan.com' }

export const bsc: Chain = {
  id: 56,
  name: 'BNB Smart Chain',
  network: 'bsc',
  rpcUrls: {
    public: 'https://bsc-dataseed1.binance.org',
    default: 'https://bsc-dataseed1.binance.org',
  },
  blockExplorers: {
    default: bscExplorer,
    etherscan: bscExplorer,
  },
  nativeCurrency: {
    name: 'Binance Chain Native Token',
    symbol: 'BNB',
    decimals: 18,
  },
  multicall: {
    address: '0xcA11bde05977b3631167028862bE2a173976CA11',
    blockCreated: 15921452,
  },
}

export const bscTest: Chain = {
  id: 97,
  name: 'BNB Smart Chain Testnet',
  network: 'bsc-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Binance Chain Native Token',
    symbol: 'tBNB',
  },
  rpcUrls: {
    public: 'https://data-seed-prebsc-1-s2.binance.org:8545/',
    default: 'https://data-seed-prebsc-1-s2.binance.org:8545/',
  },
  blockExplorers: {
    default: { name: 'BscScan', url: 'https://testnet.bscscan.com' },
  },
  multicall: {
    address: '0xcA11bde05977b3631167028862bE2a173976CA11',
    blockCreated: 17422483,
  },
  testnet: true,
}

export { rinkeby, mainnet, goerli }
