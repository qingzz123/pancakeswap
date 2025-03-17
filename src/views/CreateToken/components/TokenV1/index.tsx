import { memo, useState } from 'react'
import { ethers, ContractFactory } from 'ethers'
import { Text, Input, Button, Toggle, AutoRenewIcon, Checkbox } from '@pancakeswap/uikit'
import { useWeb3LibraryContext } from '@pancakeswap/wagmi'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { getTokenInfo, walletWatchAsset } from 'utils/yagong'
import { useChainIdName, useBalance } from 'hooks/yagong'
import Notification from 'components/Notification'

import Alert from '../Alert'
import Card from '../CoverCard'
import { ERC20Token, YAGONG_ADDRESS } from '../../config'
import {
  TokenFactory,
  TokenFactoryItem,
  ButtonSwapper,
  SelectorSwapper,
  SelectorItem,
  OtherSwapper,
  MoreItemSwapper,
  TokenFactoryItemMore,
  MoreItem,
  Introduce,
} from './style'

function App() {
  const { account, chainId } = useActiveWeb3React()
  const library = useWeb3LibraryContext()
  const { chainIdName, chainIdLink } = useChainIdName()
  const balance = useBalance()

  const [isShowAlert, setIsShowAlert] = useState(false)
  const [isCreatToken, setIsCreatToken] = useState(false)
  const [isShowCover, setIsShowCover] = useState(false)
  const [isBurn, setIsBurn] = useState(false)
  const [isMint, setIsMint] = useState(false)
  const [isStop, setIsStop] = useState(false)
  const [isBlack, setIsBlack] = useState(false)
  const [isDeflate, setIsDeflate] = useState(false) // 是否货币通缩
  // 创建代币合约地址
  const [contract, setContract] = useState('')
  // 区块链连接
  const [contractHref, setContractHref] = useState('')

  const [tokenName, setTokenName] = useState('')
  const [symbol, setSymbol] = useState('')
  const [decimals, setDecimals] = useState(18)
  const [totalSupply, setTotalSupply] = useState(10000)
  // 是否选择纯手续费
  const [isCheckedAdmini, setIsCheckedAdmini] = useState(false)
  // 创建钱包地址
  const [adminiAddress, setAdminiAddress] = useState('')
  const [txFee, setTxFee] = useState(0)
  const [burnFee, setBurnFee] = useState(0)
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
  // 开启管理员地址
  const isCheckedAdminiChange = (e: { target: { checked: boolean } }) => {
    setIsCheckedAdmini(e.target.checked)
  }
  const adminiAddressChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setAdminiAddress(e.target.value)
  }
  const isBurnChange = (e: { target: { checked: boolean } }) => {
    setIsBurn(e.target.checked)
  }
  const isMintChange = (e: { target: { checked: boolean } }) => {
    setIsMint(e.target.checked)
  }
  const isStopChange = (e: { target: { checked: boolean } }) => {
    setIsStop(e.target.checked)
  }
  const isBlackChange = (e: { target: { checked: boolean } }) => {
    setIsBlack(e.target.checked)
  }
  const isDeflateChange = (e: { target: { checked: boolean } }) => {
    setIsDeflate(e.target.checked)
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
    arr = [tokenName, symbol, decimals, totalSupply, 0, 0, account, account, YAGONG_ADDRESS]
    if (isCheckedAdmini) {
      arr[7] = adminiAddress
    }
    if (isDeflate) {
      arr[4] = txFee
      arr[5] = burnFee
      arr[6] = feeAddress
    }
    createToken(arr)
  }
  // 部署合约
  const createToken = async (arr: (string | number)[]) => {
    console.log(arr, '传入数据', chainId)
    const abi = ERC20Token.ERC20TokenTool.abi
    const bytecode = ERC20Token.ERC20TokenTool.bytecode
    const price: number = ERC20Token.ERC20TokenTool.price[chainId]
    const sign = library.getSigner()
    const factory = new ContractFactory(abi, bytecode, sign)
    const _price = ethers.utils.parseEther(price.toString()).div(10 ** 3)
    if (balance < price / 1000 + 0.04) return Notification.Error('当前余额不足')
    tipsHandler(true)

    try {
      const newContract = await factory.deploy(...arr, { value: _price })
      console.log(newContract, 'newContract')
      const hr = `${chainIdLink}${newContract.address}`
      setContract(newContract.address)
      setContractHref(hr)

      await newContract.deployed()
      tipsHandler(false)
      setIsShowCover(true)

      const { symbol_, decimals_ }: any = await getTokenInfo(newContract.address, library)
      console.log(symbol_, decimals_, newContract.address)
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
          精度(1-18)
        </Text>
        <Input value={decimals} onChange={decimalsChange} />
      </TokenFactoryItem>

      <SelectorSwapper>
        <SelectorItem>
          <Text color="#280d5f" bold>
            高级设置：
          </Text>
          <Toggle scale="md" checked={isCheckedAdmini} onChange={isCheckedAdminiChange} />
        </SelectorItem>
      </SelectorSwapper>

      {isCheckedAdmini && (
        <TokenFactoryItem>
          <Text color="#280d5f" mb="8px" bold>
            创建/拥有者
          </Text>
          <Input value={adminiAddress} onChange={adminiAddressChange} />
        </TokenFactoryItem>
      )}

      <OtherSwapper>
        <Text color="#280d5f" bold className="title">
          {' '}
          其他配置：
        </Text>
        <div className="otherItem">
          <div className="flex">
            <Checkbox scale="sm" checked={isBurn} onChange={isBurnChange} />
            <Text>燃烧</Text>
          </div>
          <div className="flex">
            <Checkbox scale="sm" checked={isMint} onChange={isMintChange} />
            <Text>铸币</Text>
          </div>
          <div className="flex">
            <Checkbox scale="sm" checked={isStop} onChange={isStopChange} />
            <Text>暂定交易</Text>
          </div>
          <div className="flex">
            <Checkbox scale="sm" checked={isBlack} onChange={isBlackChange} />
            <Text>黑名单</Text>
          </div>
          <div className="flex">
            <Checkbox scale="sm" checked={isDeflate} onChange={isDeflateChange} />
            <Text>货币通缩</Text>
          </div>
        </div>
      </OtherSwapper>

      {isDeflate && (
        <>
          <TokenFactoryItemMore>
            <MoreItemSwapper>
              <MoreItem>
                <Text color="#280d5f" bold>
                  转账手续费：
                </Text>
                <Input value={txFee} onChange={txFeeChange} type="number" />
                <Text color="#280d5f" bold style={{ marginRight: '8px' }}>
                  %
                </Text>
              </MoreItem>
              <MoreItem>
                <Text color="#280d5f" bold>
                  燃烧手续费：
                </Text>
                <Input value={burnFee} onChange={burnFeeChange} type="number" />
                <Text color="#280d5f" bold style={{ marginRight: '8px' }}>
                  %
                </Text>
              </MoreItem>
            </MoreItemSwapper>
            <Introduce>
              <Text id="introduceTitle">
                转账手续费：转账是否要收取用户手续费(如填10%,A地址转给B地址100个代币,将会收取10个转入到指定地址。
                <br />
                燃烧手续费：转账时是否需要销毁(如填10%,A地址转给B地址100个代币,将会销毁10个转入到黑洞地址
              </Text>
            </Introduce>
          </TokenFactoryItemMore>

          <TokenFactoryItem>
            <Text color="#280d5f" mb="8px" bold>
              手续费地址
            </Text>
            <Input value={feeAddress} onChange={feeAddressChange} />
          </TokenFactoryItem>
        </>
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
