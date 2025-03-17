import { ethers } from 'ethers'
import { ERC20TokenNew } from 'config/yagong'

const createToken = (
  account: string,
  chainId: number,
  library: ethers.providers.Web3Provider,
  arr: (string | number | string[] | number[])[],
) => {
  const signer = library.getSigner()
  const tokenContract = new ethers.Contract(ERC20TokenNew.contractAddress[chainId], ERC20TokenNew.abi, signer)

  return new Promise(async (resolve: (value: string) => void, reject: (reason?: any) => void) => {
    try {
      const price = ERC20TokenNew.price[chainId]
      const _price = ethers.utils.parseEther(price.toString()).div(10 ** 3)
      const result = await tokenContract.createUFactory(...arr, { value: _price })
      library.once(result.hash, async (receipt) => {
        if (!receipt) return
        const tokenArr: string[] = await tokenContract.getNowTokens(account)
        resolve(tokenArr[tokenArr.length - 1])
      })
    } catch (error) {
      reject(error)
    }
  })
}

export default createToken
