import { NFTStorage } from 'nft.storage'

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGRGODNENkE3YjE2YTdkQUUyNEIzNDhBRTA3QjAwNDRGYTRjNDdjNTEiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1MjE3MjQ1NzExNiwibmFtZSI6InFpbmd6ejEyMyJ9.PcK0C5kTfg57AMFprkKk01huSo18-CkldU1mpI-Clps'

const uploadImage = async (name: string, description: string, image: File) => {
  const storage = new NFTStorage({ token })
  try {
    const metadata = await storage.store({ name, description, image })
    const imageUrl = metadata.data.image.href
    return imageUrl
  } catch (error) {
    return error
  }
}
export default uploadImage
