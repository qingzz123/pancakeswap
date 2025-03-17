import { memo, useState } from 'react'

import { Header, TokenTool, TokenNFT, TokenAdmini } from './components'
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
        {currentIndex === 0 && <TokenTool />}
        {currentIndex === 1 && <TokenAdmini />}
        {currentIndex === 2 && <TokenNFT />}
      </ToKenSwapper>
    </TokenPage>
  )
}

export default memo(App)
