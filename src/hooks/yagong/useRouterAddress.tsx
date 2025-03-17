import { useEffect, useState } from 'react'
import { RoutersAddressObject } from 'config/yagong'
import useActiveWeb3React from 'hooks/useActiveWeb3React'

const useRouterAddress = () => {
  const { chainId } = useActiveWeb3React()
  const [routerArr, setRouterArr] = useState([])
  useEffect(() => {
    if (chainId) {
      const arr = RoutersAddressObject[chainId]
      setRouterArr(arr)
    }
  }, [chainId])

  return routerArr
}

export default useRouterAddress
