import { memo, useState } from 'react'
import { ButtonMenu, ButtonMenuItem } from '@pancakeswap/uikit'

function App({ menuClick }) {
  const [currentIndex, setCrrentIndex] = useState(0)

  const itemClick = (index: number) => {
    setCrrentIndex(index)
    menuClick(index)
  }

  return (
    <div style={{ margin: '1rem 0' }}>
      <ButtonMenu activeIndex={currentIndex} onItemClick={itemClick}>
        <ButtonMenuItem>创建代币</ButtonMenuItem>
        <ButtonMenuItem>代币管理员</ButtonMenuItem>
        <ButtonMenuItem>创建NFT</ButtonMenuItem>
      </ButtonMenu>
    </div>
  )
}

export default memo(App)
