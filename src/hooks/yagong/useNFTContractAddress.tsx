import { useState, useEffect } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { NFTContractAddress } from 'config/yagong'

const useNFTContractAddress = () => {
  const { chainId } = useActiveWeb3React()
  const [address, setAddress] = useState('')
  useEffect(() => {
    if (chainId === 56 || chainId === 97) {
      const _address = NFTContractAddress[chainId]
      setAddress(_address)
    }
  }, [chainId])
  return address
}

export default useNFTContractAddress
