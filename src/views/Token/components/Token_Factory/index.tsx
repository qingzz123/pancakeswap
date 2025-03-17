import { memo, useState } from 'react'
import { ethers, ContractFactory } from 'ethers'
import { Text, Input, Button, Toggle, AutoRenewIcon } from '@pancakeswap/uikit'
import { useWeb3LibraryContext } from '@pancakeswap/wagmi'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { ERC20Token, TokenType, YAGONG_ADDRESS, PARNER_ADDRESS } from 'config/yagong'
import { getTokenInfo, walletWatchAsset } from 'utils/yagong'
import { useChainIdName, useBalance } from 'hooks/yagong'
import Notification from 'components/Notification'
import Alert from '../Alert'
import Card from '../CoverCard'
import {
  TokenFactory,
  TokenFactoryItem,
  ButtonSwapper,
  SelectorSwapper,
  SelectorItem,
  FoldFeeSwapper,
  FoldFeeItem,
} from './style'

function App() {
  const { account, chainId } = useActiveWeb3React()
  const library = useWeb3LibraryContext()
  const { chainIdName, chainIdLink } = useChainIdName()
  const balance = useBalance()

  const [isShowAlert, setIsShowAlert] = useState(false)
  const [isCreatToken, setIsCreatToken] = useState(false)
  const [isShowCover, setIsShowCover] = useState(false)
  // 创建代币合约地址
  const [contract, setContract] = useState('')
  // 区块链连接
  const [contractHref, setContractHref] = useState('')

  const [tokenName, setTokenName] = useState('')
  const [symbol, setSymbol] = useState('')
  const [decimals, setDecimals] = useState(18)
  const [totalSupply, setTotalSupply] = useState(10000)
  // 是否选择纯手续费
  const [isCheckedFee, setIsCheckedFee] = useState(false)
  // 营销手续费
  const [txFee, setTxFee] = useState(0)
  // 燃烧手续费
  const [burnFee, setBurnFee] = useState(0)
  // 营销钱包地址
  const [feeAddress, setFeeAddress] = useState('')

  const tokenNameChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setTokenName(e.target.value)
  }
  const symbolChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setSymbol(e.target.value)
  }
  const decimalsChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setDecimals(Number(e.target.value))
  }
  const totalSupplyChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setTotalSupply(Number(e.target.value))
  }
  // 开启纯手续费
  const isCheckedFeeChange = (e: { target: { checked: boolean } }) => {
    setIsCheckedFee(e.target.checked)
  }
  const txFeeChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setTxFee(Number(e.target.value))
  }
  const burnFeeChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setBurnFee(Number(e.target.value))
  }
  const feeAddressChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setFeeAddress(e.target.value)
  }
  // 创建合约中奖处理
  const createTokenMiddle = () => {
    let arr = []
    let tokenType = ERC20Token.ERC20FixToken
    arr = [tokenName, symbol, decimals, totalSupply, account, YAGONG_ADDRESS, PARNER_ADDRESS]
    if (isCheckedFee) {
      arr = [
        tokenName,
        symbol,
        decimals,
        totalSupply,
        account,
        txFee,
        burnFee,
        feeAddress,
        YAGONG_ADDRESS,
        PARNER_ADDRESS,
      ]
      tokenType = ERC20Token.ERC20FixToken
    }
    createToken(tokenType, arr)
  }
  // 部署合约
  const createToken = async (token: TokenType, arr: (string | number)[]) => {
    console.log(arr, '传入数据', chainId)
    const abi = token.abi
    const bytecode = token.bytecode
    const price: number = token.price[chainId]
    const sign = library.getSigner()
    const factory = new ContractFactory(abi, bytecode, sign)
    const _price = ethers.utils.parseEther(price.toString()).div(10 ** 3)
    if (balance < price / 1000 + 0.04) return Notification.Error('当前余额不足')
    tipsHandler(true)

    try {
      const newContract = await factory.deploy(...arr, { value: _price })
      const hr = `${chainIdLink}${newContract.address}`
      setContract(newContract.address)
      setContractHref(hr)

      await newContract.deployed()
      tipsHandler(false)
      setIsShowCover(true)

      const { symbol_, decimals_ }: any = await getTokenInfo(newContract.address, library)
      walletWatchAsset(newContract.address, symbol_, decimals_)
    } catch (error) {
      console.log(error)
      tipsHandler(false)
    }
  }

  const tipsHandler = (isShow: boolean) => {
    setIsShowAlert(isShow)
    setIsCreatToken(isShow)
  }
  const cardClick = () => {
    setIsShowCover(false)
  }

  return (
    <TokenFactory>
      {isShowCover && (
        <Card contract={contract} contractHref={contractHref} cardClick={cardClick} chainIdName={chainIdName} />
      )}

      {isShowAlert && <Alert title="代币创建中..." dec={`View on ${chainIdName}`} />}

      <TokenFactoryItem>
        <Text color="#280d5f" mb="8px" bold>
          代币名称
        </Text>
        <Input value={tokenName} onChange={tokenNameChange} />
      </TokenFactoryItem>
      <TokenFactoryItem>
        <Text color="#280d5f" mb="8px" bold>
          代币符号
        </Text>
        <Input value={symbol} onChange={symbolChange} />
      </TokenFactoryItem>
      <TokenFactoryItem>
        <Text color="#280d5f" mb="8px" bold>
          代币总量
        </Text>
        <Input value={totalSupply} onChange={totalSupplyChange} />
      </TokenFactoryItem>
      <TokenFactoryItem>
        <Text color="#280d5f" mb="8px" bold>
          小数位数
        </Text>
        <Input value={decimals} onChange={decimalsChange} />
      </TokenFactoryItem>

      <SelectorSwapper>
        <SelectorItem>
          <Text color="#280d5f" bold>
            买卖手续费设置：
          </Text>
          <Toggle scale="md" checked={isCheckedFee} onChange={isCheckedFeeChange} />
        </SelectorItem>
      </SelectorSwapper>

      {isCheckedFee && (
        <FoldFeeSwapper>
          <FoldFeeItem>
            <Text color="#280d5f" bold>
              营销
            </Text>
            <Input value={txFee} onChange={txFeeChange} />
          </FoldFeeItem>
          <FoldFeeItem>
            <Text color="#280d5f" bold>
              销毁
            </Text>
            <Input value={burnFee} onChange={burnFeeChange} />
          </FoldFeeItem>
        </FoldFeeSwapper>
      )}
      {isCheckedFee && (
        <TokenFactoryItem>
          <Text color="#280d5f" mb="8px" bold>
            营销钱包地址
          </Text>
          <Input value={feeAddress} onChange={feeAddressChange} />
        </TokenFactoryItem>
      )}

      <ButtonSwapper>
        {!isCreatToken ? (
          <Button onClick={createTokenMiddle}>立即创建</Button>
        ) : (
          <Button isLoading endIcon={<AutoRenewIcon spin color="currentColor" />}>
            创建中...
          </Button>
        )}
      </ButtonSwapper>
    </TokenFactory>
  )
}

export default memo(App)
