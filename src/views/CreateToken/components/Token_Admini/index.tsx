import React, { memo, useState } from 'react'
import { Text, Input, Button } from '@pancakeswap/uikit'
import { TokenAdmini, TokenAdminiItem, ComfirmedButton } from './style'

function App() {
  const [isShow, setIsShow] = useState(true)
  const [adminiAddress, setAdminiAddress] = useState('')

  const adminiAddressChange = (e) => {
    setAdminiAddress(e.target.value)
  }

  return (
    <TokenAdmini>
      {isShow && (
        <>
          <TokenAdminiItem>
            <Text className="title" color="#280d5f" bold>
              Token地址：
            </Text>
            <Input />
          </TokenAdminiItem>
          <ComfirmedButton>
            <Button>确定</Button>
          </ComfirmedButton>
        </>
      )}
    </TokenAdmini>
  )
}

export default memo(App)
