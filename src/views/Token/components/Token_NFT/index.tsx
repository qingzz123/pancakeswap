import React, { memo, useEffect, useRef, useState } from 'react'
import { Input, Text, Button, AutoRenewIcon } from '@pancakeswap/uikit'
import { ethers } from 'ethers'
import { useWeb3LibraryContext } from '@pancakeswap/wagmi'
import useActiveWeb3React from 'hooks/useActiveWeb3React'

import { useTranslation } from '@pancakeswap/localization'
import { uploadImage, castingNFT, getNFTCreateAmount, walletWatchAsset } from 'utils/yagong'
import { YAGONG_ADDRESS, PARNER_ADDRESS, ERC721NFT, NFTContractAddress } from 'config/yagong'
import { useChainIdName } from 'hooks/yagong'
import Notification from 'components/Notification'
import CoverCard from '../CoverCard'

import { CREACTNFTWAPPER, FarmsWrapper, INFHeader, INFForm, INFFormItem, INFCreated } from './style'

function App() {
  const { t } = useTranslation()
  const { account, chainId } = useActiveWeb3React()
  const library = useWeb3LibraryContext()
  const { chainIdName, chainIdLink } = useChainIdName()
  const [isCreate, setIsCreate] = useState(false)
  const [isCasting, setIsCasting] = useState(false)
  const [isCover, setIsCover] = useState(false)

  const fileRef = useRef(null) // fieinput Ref
  const [imageUrl, setImageUrl] = useState(null) // 上传图片 base64 信息
  const [imageFile, setImageFile] = useState(null) // 上传图片文件对象

  const [newNFTAddress, setNewNFTAddress] = useState('') // nft 合约地址
  const [newNFTAddressHr, setNewNFTAddressHr] = useState('') // nft 合约跳转链接
  const [createNFTTotal, setCreateNFTTotal] = useState(0)
  const [price, setPrice] = useState(0)
  useEffect(() => {
    if (chainId) {
      const _price = ERC721NFT.price[chainId]
      setPrice(_price)
    }
  }, [chainId])

  const [NFTAddress, setNFTAddress] = useState('')
  const NFTAddressChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setNFTAddress(e.target.value)
  }
  const [NFTTargetAddress, setNFTTargetAddress] = useState('') //
  const NFTTargetAddressChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setNFTTargetAddress(e.target.value)
  }

  // 点击 弹出 文件选择框
  const imageClick = () => {
    fileRef.current.click()
  }
  // 得到上传的文件
  const putfile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0]
    handleImage(file)
  }

  // 拖拽事件处理
  const drop = (e) => {
    e.stopPropagation()
    e.preventDefault()
    const date = e.dataTransfer
    const file = date.files[0]
    handleImage(file)
  }
  // 拖拽事件处理
  const ingoreDrag = (e) => {
    e.stopPropagation()
    e.preventDefault()
  }
  // 图片对象处理
  const handleImage = (file) => {
    setImageFile(file)
    if (file) {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = function (e) {
        setImageUrl(e.target.result) // 图片 base64 encoded
      }
    }
  }

  const [nftName, setNftName] = useState('') // NFT name
  const nftNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNftName(e.target.value)
  }
  const [description, setDescription] = useState('') // nft 描述
  const nftDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value)
  }

  const createNftHandler = async () => {
    if (!(chainId === 56 || chainId === 97)) return Notification.Warning('当前仅支持币安链')
    setIsCreate(true)
    try {
      const nftImageUrl = await uploadImage(nftName, description, imageFile)
      const argument = [[nftImageUrl, nftName, description], YAGONG_ADDRESS, PARNER_ADDRESS]
      const sign = library.getSigner()
      const NFTContract = new ethers.Contract(NFTContractAddress[chainId], ERC721NFT.abi, sign)
      const _price = ethers.utils.parseEther(price.toString()).div(10 ** 3)
      const res = await NFTContract.createNFT(...argument, { value: _price })
      library.once(res.hash, async () => {
        const nftAddress = await NFTContract.getNowNFT(account)
        const hr = `${chainIdLink}${nftAddress}`
        setNewNFTAddress(nftAddress)
        setNewNFTAddressHr(hr)
        setIsCreate(false)
        setIsCover(true)
        walletWatchAsset(nftAddress, description, 0)
      })
    } catch (error) {
      setIsCreate(false)
    }
  }
  const castingHandler = async () => {
    if (!(chainId === 56 || chainId === 97)) return Notification.Warning('当前仅支持币安链')
    setIsCasting(true)
    const res = await castingNFT(library, NFTAddress, NFTTargetAddress)
    if (res) {
      setIsCasting(false)
      Notification.Success('铸造成功')
    } else {
      setIsCasting(false)
      Notification.Error('铸造失败')
    }
  }

  useEffect(() => {
    getNFTTotalHandler()
  }, [])

  const getNFTTotalHandler = async () => {
    if (!(chainId === 56 || chainId === 97)) return
    const res: any = await getNFTCreateAmount(library, NFTContractAddress[chainId])
    if (res) setCreateNFTTotal(res)
  }
  const coverClickHandler = async () => {
    setIsCover(false)
  }

  return (
    <CREACTNFTWAPPER>
      <FarmsWrapper>
        {isCover && (
          <CoverCard
            contract={newNFTAddress}
            contractHref={newNFTAddressHr}
            cardClick={coverClickHandler}
            chainIdName={chainIdName}
          />
        )}
        {/* 头部 */}
        <INFHeader>
          <Text bold fontSize="30px">
            {' '}
            创建NFT{' '}
          </Text>
        </INFHeader>
        {/* 输入内容 */}
        <INFForm>
          <Text color="#280d5f" mb="8px">
            费用: {price / 1000}
          </Text>
          <INFFormItem>
            <div className="item">
              <Text bold>{t('Image, Video, Audio, or 3D Model')}</Text>
              <Text fontSize="12px">{t('File types supported: JPG, PNG, GIF, SVG, WEBM, WAV, OGG, GLB, GLTF.')}</Text>
            </div>
            <div
              className="item-imageWrapper"
              onDragEnter={(e) => ingoreDrag(e)}
              onDragOver={(e) => ingoreDrag(e)}
              onDrop={(e) => drop(e)}
            >
              <Input type="file" ref={fileRef} onChange={putfile} style={{ display: 'none' }} />
              <Text className="defaultIcon">{t('Upload Image')}</Text>
              {imageUrl && <img src={imageUrl} className="item-image" alt="" />}
              <div className="item-imageWrapper-image" onClick={imageClick}></div>
            </div>
          </INFFormItem>

          <INFFormItem>
            <div className="item">
              <Text color="#280d5f" mb="8px" bold>
                {' '}
                NFT名称
              </Text>
            </div>
            <Input className="Input--input" type="text" onChange={(e) => nftNameChange(e)} value={nftName} />
          </INFFormItem>
          <INFFormItem>
            <div className="item">
              <Text color="#280d5f" mb="8px" bold>
                {' '}
                NFT描述{' '}
              </Text>
            </div>
            <Input className="Input--textarea" onChange={(e) => nftDescription(e)} value={description} />
          </INFFormItem>
        </INFForm>
        {/* 链接钱包  创建NFT */}
        <INFCreated>
          {!isCreate ? (
            <Button onClick={createNftHandler}>创建NFT</Button>
          ) : (
            <Button isLoading endIcon={<AutoRenewIcon spin color="currentColor" />}>
              创建中...
            </Button>
          )}
        </INFCreated>

        <INFForm>
          <INFFormItem>
            <Text color="#280d5f" mb="8px" bold className="item">
              NFT合约地址
            </Text>
            <Input onChange={NFTAddressChange} value={NFTAddress} />
          </INFFormItem>
          <INFFormItem>
            <Text color="#280d5f" mb="8px" bold className="item">
              NFT接收地址
            </Text>
            <Input onChange={NFTTargetAddressChange} value={NFTTargetAddress} />
          </INFFormItem>
        </INFForm>
        <INFCreated>
          {!isCasting ? (
            <Button onClick={castingHandler}>铸造NFT</Button>
          ) : (
            <Button isLoading endIcon={<AutoRenewIcon spin color="currentColor" />}>
              铸造中...
            </Button>
          )}
        </INFCreated>
        <Text>total: {createNFTTotal}</Text>
      </FarmsWrapper>
    </CREACTNFTWAPPER>
  )
}

export default memo(App)
