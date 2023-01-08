import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import Input from '../components/form-elements/input'
import Button from '../components/form-elements/button'
import Header from '../components/form-components/Header'
import Timeline from '../components/timeline'
import ProductDetail from '../components/product-detail'
import contractABI from '../Contracts/logchain_ABI.json'
import { useContractRead, usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi'

interface ProductDetails {
  name: string;
  description: string;
  imageURL: string;
  locationStatuses: string[];
  timestamp: number;
}

const Producthistory: NextPage = () => {
  const [productData, setProductData] = useState({});
  const [productID,setProductID] = useState(0);
  const [productLocation,setProuctLocation] = useState('');
  const [productHistory, setProductHistory] = useState([{title: "Created Location"}]);

  const handleData = (e: any) => {
    setProductData({ ...productData, [e.target.name]: e.target.value })
  }

  const { data, isError, isLoading } = useContractRead({
    address: '0x4e90677555F6Ef8136075ec5A00230Dd41F5A2e8',
    abi: contractABI,
    functionName: 'getProduct',
    args: [parseInt((productData as any).productid)]
  })

  interface ProductDetails {
    name: string;
    description: string;
    imageURL: string;
    locationStatuses: string[];
    timestamp: number;
  }

  useEffect(() => {
    if (data as ProductDetails && !isLoading) {  
      console.log(data);
          
      const { name, description, imageURL, locationStatuses, timestamp } = data as ProductDetails;
      setProductHistory(locationStatuses.map((location: string) => {
        return {title: location}
      }))
      setProductData({ ...productData, name, description, imageURL, locationStatuses, timestamp })
    }
  }, [data])

  return (
    <>
      <Head>
        <title>Product History</title>
        <meta name="description" content="LogChain -Product History" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="px-4 md:px-0 mx-auto max-w-[1080px]">
        <div className="max-w-7xl pt-5 pb-5 mx-auto">
          <Header heading="Product History" />
          <div className="flex flex-col text-center w-full">
            <div className="w-full py-4 overflow-x-hidden overflow-y-auto md:inset-0 justify-center flex md:h-full">
              <div className="relative w-full h-full md:h-auto">
                <div className="relative rounded-lg shadow-lg backdrop-blur-lg bg-white/80 dark:bg-gray-700/60">
                  <div className="px-6 py-6 lg:px-8">
                    <div className="flex flex-col md:flex-row space-x-5">
                      <div className="w-full md:w-1/2 space-y-6">
                        <form className="space-y-6">
                          <Input
                            id="productid"
                            name="productid"
                            label="Product ID"
                            type="text"
                            placeholder="Product ID"
                            onChange={handleData}
                          />
                          <Button
                            label="View History"
                          />
                        </form>
                        <p className="text-xl font-medium title-font mb-4 text-[#D27D2D]">{(productData as any).name}</p>
                    <div className="p-2 flex flex-col">
                      <ProductDetail label="" value={(productData as any).imageURL} type="image" />
                    </div>
                      </div>
                      <div className="w-full md:w-1/2 space-y-6">
                        <Timeline points={productHistory} />
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

export default Producthistory