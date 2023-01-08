import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { NextPage } from 'next'
import { AiOutlineShareAlt } from 'react-icons/ai'
import { FaBookReader } from 'react-icons/fa'
import { MdComputer } from 'react-icons/md'

interface FeatureCardProps {
  title: string
  desc: string
  icon: any
}

const FeatureCard = ({title, desc, icon}: FeatureCardProps) => {
  return (
    <div className="relative backdrop-blur-lg bg-white/40 dark:bg-gray-700 p-5 rounded-lg">
      <dt className="flex flex-col items-center md:items-start">
        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#008dff] text-white">
          {icon}
        </div>
        <p className="pt-5 text-lg leading-6 font-medium text-gray-900 dark:text-white">
          {title}
        </p>
      </dt>
      <dd className="mt-2 text-base text-gray-500 text-center md:text-left dark:text-white">
        {desc}
      </dd>
    </div>
  )
}

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>LogChain</title>
        <meta name="description" content="LogChain" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="px-4 md:px-0 mx-auto max-w-[1080px]">
        <div className="md:text-left h-[calc(100vh-60px)] flex justify-center flex-row">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
              <span className="block xl:inline">Welcome to</span>
              <span className="block text-[#008dff] pb-4">
                LogChain
              </span>
              <span className="block text-[#008dff] text-4xl">
                SupplyChain Management System
              </span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              Track your products just by using product id.
            </p>
            <div className="mt-5 sm:mt-8 sm:flex lg:justify-start md:flex-col lg:flex-row">
              <div>
                <Link href="/producthistory" className="w-full md:w-[70%] lg:w-full flex items-center justify-center px-8 py-3 border-0 border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-[#00bdff] via-[#008dff] to-[#a13bf7] hover:bg-gradient-to-r hover:from-[#a13bf7] hover:via-[#008dff] hover:to-[#00bdff] md:py-2 md:text-lg md:px-8"
                  >Track Product</Link>
              </div>
            </div>
          </div>
          <div className="md:flex hidden my-auto w-[30%] md:w-[50%]">
            <Image src="/banner.png" width="500" height="500" alt="Banner" />
          </div>
        </div>

        <div className="max-w-7xl pt-5 pb-20 mx-auto">
          <div className="flex flex-col text-center w-full mb-5 md:mb-10">
            <h1 className="text-4xl mb-10 font-bold title-font mb-4 text-gray-900 dark:text-white">
              Features
            </h1>
          </div>
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            <FeatureCard icon={<FaBookReader size={25} />} title="Lorem" desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever." />
            <FeatureCard icon={<AiOutlineShareAlt size={25} />} title="Lorem" desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever." />
            <FeatureCard icon={<MdComputer size={25} />} title="Lorem" desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever." />
          </dl>
        </div>
      </main>
    </>
  )
}

export default Home
