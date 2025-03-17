import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { ERC20TokenNew } from 'config/yagong'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useWeb3LibraryContext } from '@pancakeswap/wagmi'

const useGetCreactTokenTol = () => {
  const { account, chainId } = useActiveWeb3React()
  const library = useWeb3LibraryContext()
  const [number, setNumber] = useState(0)

  useEffect(() => {
    if (chainId) getNumber()
  }, [account, chainId, library])

  const getNumber = async () => {
    const tokenContract = new ethers.Contract(ERC20TokenNew.contractAddress[chainId], ERC20TokenNew.abi, library)
    try {
      const length = await tokenContract.getLength()
      setNumber(Number(length))
    } catch (error) {
      setNumber(0)
    }
  }
  return number
}

export default useGetCreactTokenTol
