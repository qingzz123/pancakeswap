import ERC20ToolABI from './abi/ERC20ToolABI.json'

import ERC20ToolBytecode from './bytecode/ERC20ToolBytecode.json'

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

const ERC20TokenTool: TokenType = {
  abi: ERC20ToolABI,
  bytecode: ERC20ToolBytecode,
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

export const ERC20Token = {
  ERC20TokenTool,
}

export const YAGONG_ADDRESS = '0x13FC5BD0A0ee0E1DD30176b833D436B95c9E2cD2'
