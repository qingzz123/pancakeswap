import ERC20FixTokenABI from './abi/ERC20FixTokenABI.json'
import ERC20FeeTokenABI from './abi/ERC20FeeTokenABI.json'
import ERC721TokenABI from './abi/ERC721TokenABI.json'
import TOKEN_ABI from './abi/TokenFactoryV2_ABI.json'

import ERC20FixTokenBytecode from './bytecode/ERC20FixTokenBytecode.json'
import ERC20FeeTokenBytecode from './bytecode/ERC20FeeTokenBytecode.json'

export { default as ERC20ABI } from './abi/ERC20ABI.json'
export { default as NFTABI } from './abi/NFTABI.json'

export interface TokenType {
  abi: any
  bytecode: string
  price: {
    1: number
    4: number
    5: number
    56: number
    97: number
    43114: number
    137: number
    10: number
    128: number
    2000: number
    66: number
    12133: number
  }
}

const ERC20FixToken: TokenType = {
  abi: ERC20FixTokenABI,
  bytecode: ERC20FixTokenBytecode,
  price: {
    1: 20,
    4: 20,
    5: 20,
    56: 20,
    97: 20,
    43114: 20,
    137: 20,
    10: 20,
    128: 20,
    2000: 20,
    66: 20,
    12133: 20,
  },
}
const ERC20FeeToken: TokenType = {
  abi: ERC20FeeTokenABI,
  bytecode: ERC20FeeTokenBytecode,
  price: {
    1: 20,
    4: 20,
    5: 20,
    56: 20,
    97: 20,
    43114: 20,
    137: 20,
    10: 20,
    128: 20,
    2000: 20,
    66: 20,
    12133: 20,
  },
}
export const ERC721NFT = {
  abi: ERC721TokenABI,
  price: {
    1: 20,
    4: 20,
    5: 20,
    56: 20,
    97: 20,
    43114: 20,
    137: 20,
    10: 20,
    128: 20,
    2000: 20,
    66: 20,
    12133: 20,
  },
}

export const YAGONG_ADDRESS = '0x13FC5BD0A0ee0E1DD30176b833D436B95c9E2cD2'
export const PARNER_ADDRESS = '0x13FC5BD0A0ee0E1DD30176b833D436B95c9E2cD2'

export const ERC20Token = {
  ERC20FixToken,
  ERC20FeeToken,
}

export const RoutersAddressObject = {
  1: [
    {
      name: 'PancakeSwap11',
      router: '0xB6BA90af76D139AB3170c7df0139636dB6120F7e',
    },
  ],
  4: [
    {
      name: 'PancakeSwap44',
      router: '0xB6BA90af76D139AB3170c7df0139636dB6120F7e',
    },
  ],
  5: [
    {
      name: 'PancakeSwap55',
      router: '0xB6BA90af76D139AB3170c7df0139636dB6120F7e',
    },
  ],
  56: [
    {
      name: 'PancakeSwap',
      router: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
    },
    {
      name: 'FstSwap',
      router: '0x1b6c9c20693afde803b27f8782156c0f892abc2d',
    },
  ],
  97: [
    {
      name: 'PancakeSwap',
      router: '0xB6BA90af76D139AB3170c7df0139636dB6120F7e',
    },
  ],
}

export const NFTContractAddress = {
  56: '0x37eb9F3841a4847f873D20042A871f474710F6B7',
  97: '0x939f784F34551bbdb4dbF66F2b81424B90649A32',
}

// v2 创建代币
export const ERC20TokenNew = {
  abi: TOKEN_ABI,
  contractAddress: {
    56: '0x539eFbf7eCA5fbCA44ffd47970bc490187bB14df',
    97: '0xe060e9ce1d807511b1E953D39414eA7818B0DcE5',
  },
  price: {
    56: 50,
    97: 50,
  },
}

// 合伙人地址 域名匹配
export const PARTNER_ADDRESS_OBJECT: object = {
  'localhost:3000': '0x7d1b5a54b17a4D2bC2CEA69ae29d1A441020bbE1',
  'www.yagong.xyz': '0x7d1b5a54b17a4D2bC2CEA69ae29d1A441020bbE1',
  'www.xiaopang.org': '0xB5424865E853412b93c4a5caF7024Ef74E878f37',
}
// USDT 地址
export const USDT_ADDRESS = {
  56: '0x55d398326f99059fF775485246999027B3197955',
  97: '0x89614e3d77C00710C8D87aD5cdace32fEd6177Bd',
}
// 博饼路由
export const PANCAKE_ROUTER = {
  56: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
  97: '0xB6BA90af76D139AB3170c7df0139636dB6120F7e',
}
export const FIST_ROUTER = '0x1b6c9c20693afde803b27f8782156c0f892abc2d' // 小拳头路由
