import { memo } from 'react'
import { Alert } from '@pancakeswap/uikit'
import styled from 'styled-components'

export const AlertSwapper = styled.div`
  position: fixed;
  top: 60px;
  right: 40px;
  min-width: 280px;
`

function App({ title, dec }) {
  return (
    <AlertSwapper>
      <Alert title={title}>{dec}</Alert>
    </AlertSwapper>
  )
}

export default memo(App)
