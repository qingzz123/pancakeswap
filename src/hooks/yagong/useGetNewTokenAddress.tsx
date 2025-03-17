import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { ERC20TokenNew } from 'config/yagong'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useWeb3LibraryContext } from '@pancakeswap/wagmi'

const useGetNewTokenAddress = () => {
  const { account, chainId } = useActiveWeb3React()
  const library = useWeb3LibraryContext()
  const [tokenAddress, setTokenAddress] = useState('')

  useEffect(() => {
    if (account && library) getTokenAddressHandler()
  }, [account, library])

  const getTokenAddressHandler = async () => {
    const tokenContract = new ethers.Contract(ERC20TokenNew.contractAddress[chainId], ERC20TokenNew.abi, library)
    try {
      const tokenArr: string[] = await tokenContract.getNowTokens(account)
      const addr = tokenArr[tokenArr.length - 1]
      setTokenAddress(addr)
    } catch (error) {
      setTokenAddress('')
    }
  }

  return tokenAddress
}

export default useGetNewTokenAddress
