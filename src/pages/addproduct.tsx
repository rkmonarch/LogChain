import { NextPage } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Input from '../components/form-elements/input'
import Button from '../components/form-elements/button'
import FileUpload from '../components/form-elements/file-upload'
import Header from '../components/form-components/Header'
import { usePrepareContractWrite, useContractWrite,useWaitForTransaction } from 'wagmi'
import ABI from '../Contracts/logchain_ABI.json'
import { Filelike, Web3Storage } from "web3.storage";



const Addproduct: NextPage = () => {
  const [imageUrl, setImageUrl] = useState('')
  const [image, setImage] = useState('')
  const [id, setproductID] = useState(0);
  const [name, setName] = useState(''); 
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
 
  const { config } = usePrepareContractWrite({
    address: '0xbFfdfEC484fBC3975135684B02dB96eB70535ec1',
    abi: ABI,
    functionName: 'addProduct',
    args: [id, name, description, location, imageUrl],
  })
  const { data, write } = useContractWrite(config)
 
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })
  return (
    <>
      <Head>
        <title>Add Product</title>
        <meta name="description" content="LogChain - Add Product" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="px-4 md:px-0 mx-auto max-w-[1080px]">
        <div className="max-w-7xl pt-5 pb-5 mx-auto">
          <Header heading="Add Product" />
          <div className="flex flex-col text-center w-full">
            <div className="w-full py-4 overflow-x-hidden overflow-y-auto md:inset-0 justify-center flex md:h-full">
              <div className="relative w-full h-full md:h-auto">
                <div className="relative rounded-lg shadow-lg backdrop-blur-lg bg-white/80 dark:bg-gray-700/60">
                  <div className="px-6 py-6 lg:px-8">
                    <form className="space-y-6">
                      <div className="flex flex-col md:flex-row md:space-x-5">
                        <div className="w-full md:w-1/2 space-y-6 mb-7 md-mb-0">
                          <Input
                            id="productid"
                            name="productid"
                            label="Product ID"
                            type="text"
                            placeholder="Product ID"
                            onChange={(e) => setproductID(parseInt(e.target.value))}
                          />
                          <Input
                            id="productname"
                            name="productname"
                            label="Product Name"
                            placeholder="Product Name"
                            onChange={(e) => setName(e.target.value)}
                          />
                          <Input
                            id="description"
                            name="description"
                            label="Description"
                            placeholder="Description"
                            onChange={(e) => setDescription(e.target.value)}
                          />
                        </div>
                        <div className="w-full md:w-1/2 space-y-6">
                          <Input
                            id="Location"
                            name="Location"
                            label="Location"
                            placeholder="Location"
                            onChange={(e) => setLocation(e.target.value)}
                          />
                          <div className="flex flex-col md:flex-row space-x-5">
                            <FileUpload
                              id="productimage"
                              name="productimage"
                              label="Product Image"
                             onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              const image = URL.createObjectURL(e.target.files[0]);
                              setImage(image)
                                const files = (e.target as HTMLInputElement).files!;
                                const client = new Web3Storage({
                                  token:
                                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDkxZTRjOEMwNTJiMzkzNEQ3Nzc5NWM3QWQ3MkQ0MTFhMGQyMWUxODIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzE2ODYwNTU1NjIsIm5hbWUiOiJNYXRpYy1Qcm9maWxlIn0.zDWjIoqZUCnPXtvWXjm_ZbvPN2ZZHTfcK7JHdM2S7hk",
                                });
                                client.put(files).then((cid) => {
                                  console.log(cid);
                              
                                  setImageUrl(
                                    `https://${cid}.ipfs.w3s.link/${files[0].name}`
                                  )
    
                                })}}
                            />
                            <Image 
                              src={image !== '' ? image : '/Preview-icon.webp'} 
                              alt="preview" 
                              width={200} 
                              height={200} />
                          </div>
                        </div>
                      </div>
                      <div className="max-w-[200px] flex m-auto">
                      <Button label="Add Product" onClick={() => {
                            write?.()
                          }} />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Addproduct