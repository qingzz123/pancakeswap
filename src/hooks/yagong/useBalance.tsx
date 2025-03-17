import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useWeb3LibraryContext } from '@pancakeswap/wagmi'

const useBalance = () => {
  const [balance, setBalance] = useState(0)
  const { account, chainId } = useActiveWeb3React()
  const library = useWeb3LibraryContext()
  useEffect(() => {
    if (chainId && library) {
      getBalance()
    }
  }, [chainId, library])
  const getBalance = async () => {
    const balance_ = await library.getBalance(account)
    const _balance = parseFloat(ethers.utils.formatEther(balance_)).toFixed(3)
    setBalance(Number(_balance))
  }
  return balance
}

export default useBalance
