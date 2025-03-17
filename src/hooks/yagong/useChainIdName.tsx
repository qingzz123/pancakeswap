import { useState, useEffect } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'

const useChainIdName = () => {
  const { chainId } = useActiveWeb3React()
  const [chainIdName, setChainIdName] = useState('BNB Smart Chain')
  const [chainIdLink, setChainIdLink] = useState('')

  useEffect(() => {
    if (chainId) {
      let hr: string
      let _chainIdName: string
      switch (chainId) {
        case 1:
          hr = `https://etherscan.io/address/`
          _chainIdName = `Ethereum`
          break
        case 4:
          hr = `https://rinkeby.etherscan.io/address/`
          _chainIdName = `Rinkeby`
          break
        case 5:
          hr = `https://goerli.etherscan.io/address/`
          _chainIdName = `Goerli`
          break
        case 56:
          hr = `https://bscscan.com/address/`
          _chainIdName = `BNB Smart Chain`
          break
        case 97:
          hr = `https://testnet.bscscan.com/address/`
          _chainIdName = `BNB Smart Chain Testnet`
          break
        default:
          break
      }
      setChainIdName(_chainIdName)
      setChainIdLink(hr)
    }
  }, [chainId])

  return { chainIdName, chainIdLink }
}

export default useChainIdName
