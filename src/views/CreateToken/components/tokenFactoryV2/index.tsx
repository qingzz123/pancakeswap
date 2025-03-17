import React, { memo, useState, useEffect } from 'react'
import { Switch, Tooltip } from 'antd'
import { QuestionCircleOutlined, CopyOutlined } from '@ant-design/icons'
import copy from 'copy-to-clipboard'
import { ethers } from 'ethers'

import { Text, Input, Button, AutoRenewIcon } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { useWeb3LibraryContext } from '@pancakeswap/wagmi'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { isAddress } from 'utils'
import Notification from 'components/Notification'

import { useGetNewTokenAddress, useGetCreactTokenTol, useChainIdName } from 'hooks/yagong'
import { createToken, walletWatchAsset } from 'utils/yagong'
import {
  YAGONG_ADDRESS,
  PARNER_ADDRESS,
  USDT_ADDRESS,
  PANCAKE_ROUTER,
  FIST_ROUTER,
  ERC20TokenNew,
  PARTNER_ADDRESS_OBJECT,
} from 'config/yagong'
import CoverCard from '../CoverCard'
import Alert from '../Alert'
import {
  TokenFactoryV2,
  TokenFactoryItem,
  AdvancedOptionsSwitch,
  AdvancedOptionsSwapper,
  ButtonWrapper,
  TokenFactoryItemMore,
  MoreItemSwapper,
  Introduce,
  MoreItem,
  TokenFactoryItemAddress,
} from './style'

function App() {
  const { t } = useTranslation() // 多语言插件
  const { account, chainId } = useActiveWeb3React()
  const library = useWeb3LibraryContext()
  const createTokenTol: number = useGetCreactTokenTol()
  const newTokenAddr = useGetNewTokenAddress()
  const { chainIdName, chainIdLink } = useChainIdName()

  const [contractAddress, setContractAddress] = useState('') // 合约地址
  const [successUrl, setSuccessUrl] = useState('') // 合约地址链接
  const [isCreateToken, setIsCreateToken] = useState(false)
  const [isCover, setIsCover] = useState(false)
  const [isShowAlert, setIsShowAlert] = useState(false)
  /*
   *填写的数据
   */
  const [tokenName, setTokenName] = useState('') // 代码名称
  const tokenNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTokenName(e.target.value)
  }
  const [tokenSymbol, setTokenSymbol] = useState('') // 代币符号
  const tokenSymbolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTokenSymbol(e.target.value)
  }
  const [tokenDecimals, setTokenDecimals] = useState('18') // 小数点
  const tokenDecimalsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTokenDecimals(e.target.value)
  }
  const [supplyAmount, setSupplyAmount] = useState('') // 发币总量
  const supplyAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSupplyAmount(e.target.value)
  }
  const [txFee, setTxFee] = useState('0') // 营销手续费
  const txFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTxFee(e.target.value)
  }
  const [burnFee, setBurnFee] = useState('0') // 销毁手续费
  const burnFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBurnFee(e.target.value)
  }
  const [lpFee, setLpFee] = useState('0') // LP分红手续费
  const lpFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLpFee(e.target.value)
  }
  const [ownerAddress, setOwnerAddress] = useState('') // 持币地址
  const ownerAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOwnerAddress(e.target.value)
  }
  useEffect(() => {
    if (account) setOwnerAddress(account)
  }, [account])
  const [feeAddress, setFeeAddressAddress] = useState('') // 营销钱包地址
  const feeAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFeeAddressAddress(e.target.value)
  }
  const [tradingPairAddress, setTradingPairAddress] = useState('') // 交易对地址
  const tradingPairAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTradingPairAddress(e.target.value)
  }
  const [routerAddress, setRouterAddress] = useState('') //路由地址
  const routerAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRouterAddress(e.target.value)
  }
  useEffect(() => {
    setTradingPairAddress(USDT_ADDRESS[chainId])
    setRouterAddress(PANCAKE_ROUTER[chainId])
  }, [chainId])

  const [award, setAward] = useState('') // 代理奖励
  const awardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAward(e.target.value)
  }
  const [destroyNumber, setDestroyNumber] = useState('') // 销毁多少结束
  const destroyNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDestroyNumber(e.target.value)
  }
  const [botTime, setBotTime] = useState('15') //杀多少秒机器人
  const botTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBotTime(e.target.value)
  }
  const [maxHave, setMaxHave] = useState('') // 最大持有数量
  const maxHaveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxHave(e.target.value)
  }
  const [maxTax, setMaxTax] = useState('') // 单笔最大交易量
  const maxTaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxTax(e.target.value)
  }
  /*
   * 开启选项
   */
  const [isAdvancedOptions, setIsAdvancedOptions] = useState(false) // 开启高级选项
  const isAdvancedOptionsChange = (checked: boolean) => {
    setIsAdvancedOptions(checked)
  }
  const [openOwner, setOpenOwner] = useState(false) // 开启所有权才能授权
  const openOwnerChange = (checked: boolean) => {
    setOpenOwner(checked)
  }
  const [isLimited, setIsLimited] = useState(false) // 开启限购
  const isLimitedChange = (checked: boolean) => {
    setIsLimited(checked)
  }
  // 获取最新的token地址
  useEffect(() => {
    if (newTokenAddr) {
      const hr = `${chainIdLink}${newTokenAddr}`
      setContractAddress(newTokenAddr)
      setSuccessUrl(hr)
    }
  }, [newTokenAddr])

  // 创建代币 传入数组处理
  const createTokenMiddle = async () => {
    if (!tokenName) return Notification.Warning(`${t('Please enter a token name')}`)
    if (!tokenSymbol) return Notification.Warning(`${t('Please enter token symbol')}`)
    if (Number(supplyAmount) <= 0)
      return Notification.Warning(`${t('The total amount of tokens must be greater than 0')}`)
    const host = window.location.host
    let partnerAddress = PARTNER_ADDRESS_OBJECT[host] // 推广人地址
    if (!partnerAddress) partnerAddress = PARNER_ADDRESS

    const arr = [
      tokenName,
      tokenSymbol,
      18,
      Number(supplyAmount),
      [
        account, // 营销钱包地址
        account, // 管理员地址
        USDT_ADDRESS[chainId], // 交易对地址
        PANCAKE_ROUTER[chainId], // 路由地址
        YAGONG_ADDRESS, // 鸭公地址
        partnerAddress, // 推广人地址
      ],
      [
        0, //营销手续费
        0, // 销毁手续费
        0, // LP分红手续费
      ],
      [], // 代理奖励百分比
      [
        0, // 销毁数量
        0, // 杀多少秒机器人
        1, // 0开启所有权地址才能首次授权功能，1关闭
        Number(supplyAmount), // 单比最大交易
        Number(supplyAmount), // 最大持有
      ],
    ]

    // 开启高级选项   纯手续费
    if (isAdvancedOptions) {
      if (Number(tokenDecimals) < 0 || Number(tokenDecimals) > 255)
        return Notification.Warning(
          `${t('Token decimal places (range 0-255), it is recommended to use the default 18 decimal places')}`,
        )
      if (Number(txFee) < 0) return Notification.Warning(`${t('Marketing fee must be greater than or equal to 0')}`)
      if (Number(burnFee) < 0) return Notification.Warning(`${t('Destruction fee must be greater than or equal to 0')}`)
      if (Number(lpFee) < 0)
        return Notification.Warning(
          `${t('The handling fee for holding coins and dividends must be greater than or equal to 0')}`,
        )

      if (!isAddress(feeAddress))
        return Notification.Warning(`${t('Please enter the correct marketing wallet address')}`)
      if (!isAddress(ownerAddress)) return Notification.Warning(`${t('Please enter the correct wallet address')}`)
      if (!isAddress(tradingPairAddress))
        return Notification.Warning(`${t('Please enter the correct trading pair address')}`)
      if (!isAddress(routerAddress)) return Notification.Warning(`${t('Please enter the correct routing address')}`)

      if (award.includes('，')) return Notification.Warning(`${t('Please use commas')}`)

      if (Number(destroyNumber) < 0 || Number(destroyNumber) > Number(supplyAmount))
        return Notification.Warning(
          `${t(
            'The amount of destruction must be greater than or equal to 0, and less than or equal to the total amount of tokens',
          )}`,
        )
      if (Number(botTime) < 0)
        return Notification.Warning(`${t('The time to kill the robot must be greater than or equal to 0')}`)

      arr[2] = Number(tokenDecimals) // 代币小数

      arr[4][0] = feeAddress // 营销地址
      arr[4][1] = ownerAddress // ownerAddress
      arr[4][2] = tradingPairAddress // 交易对地址
      arr[4][3] = routerAddress // 路由地址

      arr[5][0] = Number(txFee) * 100 // 营销手续费
      arr[5][1] = Number(burnFee) * 100 // 销毁手续费
      arr[5][2] = Number(lpFee) * 100 // LP分红手续费

      if (award) {
        const _awardArr = award.split(',')
        arr[6] = _awardArr.map((item) => Number(item) * 100)
      }

      arr[7][0] = Number(destroyNumber)
      arr[7][1] = Number(botTime)
      arr[7][2] = openOwner ? 0 : 1
    }
    // 开启限购
    if (isLimited) {
      if (maxTax) arr[7][3] = maxTax
      if (maxHave) arr[7][4] = maxHave
    }

    const balance = await library.getBalance(account)
    const _balance = Number(ethers.utils.parseEther(balance.toString())).toFixed(3) // 当前钱包余额
    const _price = (ERC20TokenNew.price[chainId] / 1000 + 0.04).toFixed(3)

    if (_balance < _price) {
      Notification.Info(`${t('Deploy error,Wallet balance must be greater than')}${_price}`)
      return
    }
    createTokenHandler(arr)
  }

  // 创建代币
  const createTokenHandler = async (arr: (string | number | string[] | number[])[]) => {
    try {
      setIsShowAlert(true)
      setIsCreateToken(true)
      const tokenAddress: string = await createToken(account, chainId, library, arr)
      const hr = `${chainIdLink}${tokenAddress}`
      setContractAddress(tokenAddress)
      setSuccessUrl(hr)
      setIsCreateToken(false)
      setIsShowAlert(false)
      setIsCover(true)
      walletWatchAsset(tokenAddress, tokenSymbol, Number(tokenDecimals))
    } catch (error) {
      setIsShowAlert(false)
      setIsCreateToken(false)
      Notification.Error(`${t('Failed to create token')}`)
    }
  }

  const copyAddressHandler = (address: string, message: string) => {
    copy(address)
    Notification.Success(message)
  }
  const coverHandler = () => {
    setIsCover(false)
  }

  return (
    <TokenFactoryV2>
      {isCover && (
        <CoverCard
          contract={contractAddress}
          contractHref={successUrl}
          cardClick={coverHandler}
          chainIdName={chainIdName}
        />
      )}
      {isShowAlert && <Alert title="代币创建中..." dec={`View on ${chainIdName}`} />}

      <Text className="bold" style={{ marginLeft: '2rem' }}>
        Total：{createTokenTol}
      </Text>

      <TokenFactoryItem>
        <Introduce style={{ color: '#009688' }}>
          {t('V2 description: The default is USDT trading pair, Pancake Exchange')}
        </Introduce>
      </TokenFactoryItem>

      <TokenFactoryItem>
        <Text className="itemTitle bold">
          {t('Token Name')}
          <span style={{ color: 'red' }}>✳</span>
        </Text>
        <Input value={tokenName} onChange={tokenNameChange} />
      </TokenFactoryItem>
      <TokenFactoryItem>
        <Text className="itemTitle bold">
          {t('Token Symbol')}
          <span style={{ color: 'red' }}>✳</span>
        </Text>
        <Input value={tokenSymbol} onChange={tokenSymbolChange} />
      </TokenFactoryItem>
      <TokenFactoryItem>
        <Text className="itemTitle bold">
          {t('Total amount of tokens')}
          <span style={{ color: 'red' }}>✳</span>
        </Text>
        <Input value={supplyAmount} onChange={supplyAmountChange} type="number" />
      </TokenFactoryItem>
      <TokenFactoryItem>
        <Text className="itemTitle bold">{t('cost')}</Text>
        <div className="price">{ERC20TokenNew.price[chainId] / 1000} BNB</div>
      </TokenFactoryItem>
      <AdvancedOptionsSwitch>
        <div className="flex_center">
          <Text className="advancedOptionsTitle bold">{t('Advanced options')}</Text>
          <Switch onChange={isAdvancedOptionsChange} checked={isAdvancedOptions} />
        </div>
      </AdvancedOptionsSwitch>

      {isAdvancedOptions && (
        <AdvancedOptionsSwapper>
          {/* 小数 */}
          <TokenFactoryItem>
            <Text className="itemTitle bold">
              {t('Decimals')}
              <span style={{ color: 'red' }}>✳</span>
              <Tooltip
                title={t('Decimal point (range 0-255), it is recommended to use the default value of 18')}
                color="cyan"
                placement="top"
              >
                <QuestionCircleOutlined style={{ color: 'red', paddingLeft: '6px' }} />
              </Tooltip>
            </Text>
            <Input value={tokenDecimals} onChange={tokenDecimalsChange} type="number" />
          </TokenFactoryItem>
          {/* 手续费 */}
          <TokenFactoryItemMore>
            <Text className="moreTitle bold">{t('Trading Fee Settings')}：</Text>
            <MoreItemSwapper>
              <MoreItem>
                <Text className="moreTitle bold">{t('Marketing fee')}</Text>
                <Input value={txFee} onChange={txFeeChange} type="number" />
              </MoreItem>
              <MoreItem>
                <Text className="moreTitle bold">{t('Destruction fee')}</Text>
                <Input value={burnFee} onChange={burnFeeChange} type="number" />
              </MoreItem>
              <MoreItem>
                <Text className="moreTitle bold">{t('lp fee')}</Text>
                <Input value={lpFee} onChange={lpFeeChange} type="number" />
              </MoreItem>
            </MoreItemSwapper>

            <Introduce id="introduceTitle">
              {t(
                'Note: If you need to set a 5% marketing fee, please fill in the number 5 in the input box. If the sum of all the fees you fill in is 10, when a user performs a swap transaction, if he buys 100USDT, he will get 90USDT worth of tokens, and when the user sells 100USDT worth of tokens, the user will get 90USDT',
              )}
            </Introduce>
          </TokenFactoryItemMore>

          {/* 营销地址 */}
          <TokenFactoryItemAddress>
            <div className="itemFlex itemFlex_block">
              <Text className="itemTitle bold">
                {t('Marketing wallet address')}
                <span style={{ color: 'red' }}>✳</span>
              </Text>
              <Input value={feeAddress} onChange={feeAddressChange} />
            </div>
          </TokenFactoryItemAddress>
          {/* 管理地址 */}
          <TokenFactoryItemAddress>
            <div className="itemFlex itemFlex_block">
              <Text className="itemTitle bold">
                {t('Administrator wallet address')}
                <span style={{ color: 'red' }}>✳</span>
              </Text>
              <Input value={ownerAddress} onChange={ownerAddressChange} />
            </div>
          </TokenFactoryItemAddress>
          {/* 池子 */}
          <TokenFactoryItemAddress>
            <div className="itemFlex itemFlex_block">
              <Text className="itemTitle bold">
                {t('Trading pair address (default U pool)')}
                <span style={{ color: 'red' }}>✳</span>
              </Text>
              <Input value={tradingPairAddress} onChange={tradingPairAddressChange} />
            </div>
            <Introduce id="introduceTitle">
              {t('Note: The default USDT trading pair, other trading pair addresses can also be entered.')}
              <span style={{ color: 'red' }}>{t('(Cannot be a WBNB trading pair)')}</span>
            </Introduce>
            <Introduce
              id="introduceTitle"
              onClick={() =>
                copyAddressHandler(USDT_ADDRESS[chainId], `${t('USDT transaction pair address copied successfully')}`)
              }
            >
              {`${t('USDT trading pair address')}:${USDT_ADDRESS[chainId]}`}
              <CopyOutlined />
            </Introduce>
          </TokenFactoryItemAddress>
          {/* 路由 */}
          <TokenFactoryItemAddress>
            <div className="itemFlex itemFlex_block">
              <Text className="itemTitle bold">
                {t('Routing address (default Pancake Exchange)')}
                <span style={{ color: 'red' }}>✳</span>
              </Text>
              <Input value={routerAddress} onChange={routerAddressChange} />
            </div>
            <Introduce
              id="introduceTitle"
              onClick={() =>
                copyAddressHandler(PANCAKE_ROUTER[chainId], `${t('Pancake router address copied successfully')}`)
              }
            >
              {`${t('Description: The default is the Pancake router address')}：${PANCAKE_ROUTER[chainId]}`}
              <CopyOutlined />
            </Introduce>
            <Introduce
              id="introduceTitle"
              onClick={() => copyAddressHandler(FIST_ROUTER, `${t('Fst router address copied successfully')}`)}
            >
              {`${t('Fst router address')}：${FIST_ROUTER}`}
              <CopyOutlined />
            </Introduce>
          </TokenFactoryItemAddress>
          {/* 代理层 */}
          <TokenFactoryItemAddress>
            <div className="itemFlex">
              <Text className="itemTitle bold">{t('Agent layer reward')}</Text>
              <Input value={award} onChange={awardChange} />
            </div>
            <Introduce id="introduceTitle">
              {t(
                'Note: For example, 3, 2, 1 means that the first-level agent will pay 3%, the second-level agent will pay 2%, and the third-level agent will pay 1%.',
              )}
              <span style={{ color: 'red' }}>{t('(please separate with commas)')}</span>
            </Introduce>
          </TokenFactoryItemAddress>
          {/* 销毁代币设置 */}
          <TokenFactoryItemAddress>
            <div className="itemFlex">
              <Text className="itemTitle bold">{t('How much to destroy')}</Text>
              <Input value={destroyNumber} onChange={destroyNumberChange} type="number" />
            </div>
            <Introduce id="introduceTitle">
              {t(
                'Note: For example, if you fill in 1000, the tokens will be destroyed continuously. When the total number of tokens is only 1000, the destruction will stop.',
              )}
            </Introduce>
          </TokenFactoryItemAddress>
          {/* 杀机器人 */}
          <TokenFactoryItemAddress>
            <div className="itemFlex">
              <Text className="itemTitle bold max_width">{t('How many seconds to kill the robot')}</Text>
              <Input value={botTime} onChange={botTimeChange} type="number" />
            </div>
            <Introduce id="introduceTitle">{t('Description: Kill the robot for 15 seconds by default')}</Introduce>
          </TokenFactoryItemAddress>

          {/* 开启限购 */}
          <AdvancedOptionsSwitch>
            <div className="flex_center">
              <Text className="advancedOptionsTitle bold">{t('Open limit')}</Text>
              <Switch onChange={isLimitedChange} checked={isLimited} />
            </div>
          </AdvancedOptionsSwitch>
          {isLimited && (
            <TokenFactoryItemMore>
              <MoreItemSwapper>
                <MoreItem>
                  <Text className="moreTitle bold">{t('Transaction max limit')}</Text>
                  <Input value={maxTax} onChange={maxTaxChange} type="number" />
                </MoreItem>
                <MoreItem>
                  <Text className="moreTitle bold">{t('Max have')}</Text>
                  <Input value={maxHave} onChange={maxHaveChange} type="number" />
                </MoreItem>
              </MoreItemSwapper>
            </TokenFactoryItemMore>
          )}

          {/* 是否开启所有权 */}
          <AdvancedOptionsSwitch>
            <div className="flex_center">
              <Text className="advancedOptionsTitle bold">{t('Owner address to add the pool for the first time')}</Text>
              <Switch onChange={openOwnerChange} checked={openOwner} />
            </div>
            <Introduce id="introduceTitle">
              {t('Description: Off by default, anyone can add pools.')}
              <span style={{ color: 'red' }}>{t('On: Only ownership addresses can add pools for the first time')}</span>
            </Introduce>
          </AdvancedOptionsSwitch>
          {/* 说明 */}
          <TokenFactoryItem>
            <Text className="itemTitle bold">
              {t('With an asterisk')}
              <span style={{ color: 'red' }}>✳</span>
              {t('The option is required, other options do not need to fill in')}
            </Text>
          </TokenFactoryItem>
        </AdvancedOptionsSwapper>
      )}
      {/*提交按钮 */}
      <ButtonWrapper>
        {!isCreateToken ? (
          <Button onClick={createTokenMiddle}>{t('Submit')}</Button>
        ) : (
          <Button isLoading endIcon={<AutoRenewIcon spin color="currentColor" />}>
            创建中...
          </Button>
        )}
      </ButtonWrapper>
      {/* 最新合约地址显示 */}
      <TokenFactoryItem className="contract_address">
        <Text className="itemTitle bold">{t('Latest token contract address')}：</Text>
        {successUrl && (
          <>
            <a target="_blank" rel="noopener noreferrer" href={successUrl}>
              <Text>{contractAddress}</Text>
            </a>
            <CopyOutlined
              onClick={() => copyAddressHandler(contractAddress, `${t('Copy Success')}`)}
              style={{ cursor: 'pointer' }}
            />
          </>
        )}
      </TokenFactoryItem>
    </TokenFactoryV2>
  )
}

export default memo(App)
