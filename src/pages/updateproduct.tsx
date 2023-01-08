import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import Input from '../components/form-elements/input'
import Button from '../components/form-elements/button'
import Header from '../components/form-components/Header'
import ProductDetail from '../components/product-detail'
import { useContractRead } from 'wagmi'
import contractABI from '../Contracts/logchain_ABI.json'

interface ProductDetails {
  name: string;
  description: string;
  imageURL: string;
  locationStatuses: string[];
  timestamp: number;
}

const Updateproduct: NextPage = () => {
  const [productData, setProductData] = useState({});

  const handleData = (e: any) => {
    setProductData({ ...productData, [e.target.name]: e.target.value })
  }

  const { data, isError, isLoading } = useContractRead({
    address: '0x4e90677555F6Ef8136075ec5A00230Dd41F5A2e8',
    abi: contractABI,
    functionName: 'getProduct',
    args: [parseInt((productData as any).productid)]
  })

  const handleSubmit = () => {
    console.log((productData as any).Location);
  }

  useEffect(() => {
    if (data as ProductDetails && !isLoading) {      
      const { name, description, imageURL, locationStatuses, timestamp } = data as ProductDetails;
      setProductData({ ...productData, name, description, imageURL, locationStatuses, timestamp })
    }
  }, [data])

  return (
    <>
      <Head>
        <title>Update Product</title>
        <meta name="description" content="LogChain - Update Product" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="px-4 md:px-0 mx-auto max-w-[1080px]">
        <div className="max-w-7xl pt-5 pb-5 mx-auto">
          <Header heading="Update Product" />
          <div className="flex flex-col lg:flex-row text-center w-full">
            <div className="w-full md:w-1/2">
              <div className="w-full pl-0 p-4 overflow-x-hidden overflow-y-auto md:inset-0 justify-center flex md:h-full">
                <div className="relative w-full h-full md:h-auto">
                  <div className="relative rounded-lg shadow-lg backdrop-blur-lg bg-white/80 dark:bg-gray-700/60">
                    <div className="px-6 py-6 lg:px-8">
                      <form className="space-y-6">
                        <Input
                          id="productid"
                          name="productid"
                          label="Product ID"
                          type="text"
                          placeholder="Product ID"
                          onChange={handleData}
                        />
                        <Input
                          id="Location"
                          name="Location"
                          label="Location"
                          placeholder="Location"
                          onChange={handleData}
                        />
                        <Button
                          label="Update Product"
                          onClick={handleSubmit}
                        />
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="w-full pl-0 p-4 overflow-x-hidden overflow-y-auto md:inset-0 justify-center flex md:h-full">
                <div className="relative w-full h-full md:h-auto">
                  <div className="relative rounded-lg shadow-lg backdrop-blur-lg bg-white/80 dark:bg-gray-700/60">
                    <div className="px-6 py-6 lg:px-8">
                    <p className="text-xl font-medium title-font mb-4 text-[#D27D2D]">{(productData as any).name}</p>
                    <div className="p-2 flex flex-col">
                      <ProductDetail label="" value={(productData as any).imageURL} type="image" />
                    </div>
                    </div>
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

export default Updateproduct