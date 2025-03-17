import { ethers } from 'ethers'
import { ERC721NFT } from 'config/yagong'

const getNFTCreateAmount = async (library: ethers.providers.Provider, nftAddress: string) => {
  const nftContract = new ethers.Contract(nftAddress, ERC721NFT.abi, library)
  try {
    const res = await nftContract.getLength()
    const nftNum = Number(res)
    return nftNum
  } catch (error) {
    return false
  }
}
export default getNFTCreateAmount
