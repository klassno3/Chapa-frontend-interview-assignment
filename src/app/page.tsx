import Link from 'next/link'
import React from 'react'
import { FaArrowRight, FaChartBar, FaLock, FaWallet } from 'react-icons/fa6'
import Hero from "../../public/hero.jpg"
import Image from 'next/image'

const Page = () => {
  const features = [
    {
      icon: <FaWallet
        className="text-green-600 text-2xl md:text-3xl" />,
      title: "User Wallet",
      description:
        "Manage your money effortlessly with our secure and intuitive digital wallet. Send, receive, and store funds all in one place.",
    },
    {
      icon: <FaChartBar className="text-blue-600 text-2xl md:text-3xl" />,
      title: "Comprehensive Dashboard",
      description:
        "Stay on top of your finances with a clear and powerful dashboard. Visualize spending, track transactions, and control your accounts with ease.",
    },
    {
      icon: <FaLock className="text-purple-600 text-2xl md:text-3xl" />,
      title: "Secure Transactions",
      description:
        "We prioritize your safety. All your payments are protected with bank-grade encryption and real-time fraud detection.",
    },
  ];
  return (
    <div className="min-h-screen py-20 md:py-32  font-sans bg-gradient-to-tr from-blue-50 via-white to-green-50 ">

      <div className=' w-11/12 flex flex-col gap-7 mx-auto max-w-[1440px]' >
        <div className="flex flex-col md:flex-row items-start gap-5 space-y-4 md:space-y-6">
          <div className="flex flex-col items-start space-y-4 md:space-y-6">
            <h1 className="text-3xl text-secondary md:text-5xl font-extrabold text-primary-900 leading-tight">
              Welcome to <span className="text-primary">Bankly</span>
            </h1>
            <p className="text-sm md:text-lg text-secondary/70 w-3/4 ">
              Secure, fast, and reliable payment solutions built for everyone.
              Simplify your financial world with Bankly your trusted payment service provider.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-medium text-sm hover:bg-primary/90 transition"
            >
              Get Started
              <FaArrowRight className="text-sm" />
            </Link>
          </div>
          <Image
            src={ Hero }
            alt="Hero Image"
            className="w-full md:w-1/2 object-cover  rounded-lg"
            width={ 1440 }
            height={ 800 }
          />
        </div>
        <section className="mt-5 md:mt-20 ">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-xl md:text-4xl font-bold text-secondary mb-2 md:mb-4">
              Why Choose Bankly?
            </h2>
            <p className="text-secondary/80 text-sm md:text-lg mb-10  mx-auto">
              Built to empower users with reliable financial tools and insights.
            </p>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              { features.map((feature, i) => (
                <div
                  key={ i }
                  className="rounded-xl border border-gray-200  p-4 md:p-6 text-left bg-white"
                >
                  <div className="mb-3 md:mb-4 ">{ feature.icon }</div>
                  <h3 className="text-base md:text-xl font-medium mb-1 md:mb-2 text-secondary">
                    { feature.title }
                  </h3>
                  <p className="text-sm text-secondary/60">{ feature.description }</p>
                </div>
              )) }
            </div>
          </div>
        </section>
      </div>



    </div>
  )
}

export default Page
