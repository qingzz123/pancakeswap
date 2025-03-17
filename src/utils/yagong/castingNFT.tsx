import { ethers } from 'ethers'
import { NFTABI } from 'config/yagong'

const castingNFT = async (library: ethers.providers.Web3Provider, nftAddress: string, targetAddress: string) => {
  const signer = library.getSigner()
  const NFTContract = new ethers.Contract(nftAddress, NFTABI, signer)
  try {
    const res = await NFTContract.adminMint(targetAddress)
    library.once(res.hash, (receipt) => {
      return true
    })
  } catch (error) {
    return false
  }
}

export default castingNFT
