import { ethers } from 'ethers'
import { ERC20ABI } from 'config/yagong'

const getTokenInfo = async (address: string, library) => {
  try {
    const contract = new ethers.Contract(address, ERC20ABI, library)
    const name_ = await contract.name()
    const symbol_ = await contract.symbol()
    const decimals_ = await contract.decimals()
    return { name_, symbol_, decimals_ }
  } catch (error) {
    return error
  }
}
export default getTokenInfo
