import { memo, useState } from 'react'
import { Overlay, Card, Box, Heading, CardBody, CardFooter, CopyIcon, Button, BscScanIcon } from '@pancakeswap/uikit'
import copy from 'copy-to-clipboard'
import { useTheme } from 'styled-components'

import { CardSwapper, ButtonSwapper, CopySwapper } from './style'

function App({ contract, contractHref, cardClick, chainIdName }) {
  const theme = useTheme()
  const headerHeight = '60px'
  const gradientStopPoint = `calc(${headerHeight} + 1px)`
  const gradientBorderColor = `linear-gradient(transparent ${gradientStopPoint}, ${theme.colors.cardBorder} ${gradientStopPoint}), ${theme.colors.gradients.cardHeader}`

  const [show, setShow] = useState(false)

  const itemClick = () => {
    cardClick()
  }
  let timer = null
  const copyHandler = (item: string) => {
    copy(item)
    setShow(true)
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      setShow(false)
    }, 1000)
  }

  return (
    <>
      <Overlay />
      <CardSwapper>
        <Card borderBackground={gradientBorderColor}>
          <Box background={theme.colors.gradients.cardHeader} p="16px" height={headerHeight}>
            <Heading size="xl">View on {chainIdName} Create Success</Heading>
          </Box>
          <CardBody>
            合约：{contract}
            <CopyIcon onClick={() => copyHandler(contract)} style={{ margin: '0 10px' }} />
            {show && <CopySwapper>已复制代币地址</CopySwapper>}
          </CardBody>
          <CardFooter>
            合约地址：
            <a href={contractHref} target="_blank" rel="noopener noreferrer">
              {contractHref}
              <BscScanIcon style={{ margin: '0 6px' }} />
            </a>
          </CardFooter>
          <ButtonSwapper>
            <Button onClick={itemClick}>关闭</Button>
          </ButtonSwapper>
        </Card>
      </CardSwapper>
    </>
  )
}

export default memo(App)
