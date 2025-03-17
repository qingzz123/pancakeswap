import { memo, useState } from 'react'

import { Header, TokenFactory, TokenNFT } from './components'
import TokenFactoryV2 from './components/tokenFactoryV2'
import { TokenPage, ToKenSwapper } from './style'

function App() {
  const [currentIndex, setCrrentIndex] = useState(0)

  const headerItemChange = (index: number) => {
    setCrrentIndex(index)
  }

  return (
    <TokenPage>
      <ToKenSwapper>
        <Header menuClick={headerItemChange} />
        {currentIndex === 0 && <TokenFactory />}
        {currentIndex === 1 && <TokenFactoryV2 />}
        {currentIndex === 2 && <TokenNFT />}
      </ToKenSwapper>
    </TokenPage>
  )
}

export default memo(App)
