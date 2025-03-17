// 添加币种 到钱包
export const walletWatchAsset = (tokenAddress: string, tokenSymbol: string, tokenDecimals: number) => {
  const tokenType = 'ERC20'
  // const tokenImage = 'http://placekitten.com/200/300';
  window.ethereum.request({
    method: 'wallet_watchAsset',
    params: {
      type: tokenType,
      options: {
        address: tokenAddress,
        symbol: tokenSymbol,
        decimals: tokenDecimals,
        // image: tokenImage,
      },
    },
  })
}

export default walletWatchAsset
