"use client"
import UserOverview from '@/components/UserOverview'
import React from 'react'
import { users } from '@/data/data'
import Logo from "../../../public/logo-green.svg"
import Image from 'next/image'
import { Doughnut } from "react-chartjs-2";
import Pie from "../../../public/pie.svg"
import Bar from "../../../public/bar.svg"
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import TransactionOvertime from '@/components/TransactionOvertime'
import AdminOverview from '@/components/AdminOverview'

ChartJS.register(ArcElement, Tooltip, Legend)
const Page = () => {
  const totalUsers = users.length;
  const totalPayments = users.reduce((sum, user) => {
    return sum + user.payments.reduce((a, b) => a + b, 0);
  }, 0);
  const totalTransactions = users.reduce(
    (count, user) => count + user.payments.length,
    0
  );

  const activeUsers = users.filter(user => user.isActive).length;
  const activeUserPercentage = ((activeUsers / totalUsers) * 100).toFixed(2);
  interface CategoryData {
    category: string;
    amount: number;
  }

  const mockData: CategoryData[] = [
    { category: "Groceries", amount: 1200 },
    { category: "Transport", amount: 600 },
    { category: "Entertainment", amount: 350 },
    { category: "Subscriptions", amount: 200 },
    { category: "Other", amount: 400 },
  ];

  const userData = {
    labels: mockData.map((item) => item.category),
    datasets: [
      {
        label: "Spending",
        data: mockData.map((item) => item.amount),
        backgroundColor: [
          "#0caf6b",
          "#3B82F6",
          "#F59E0B",
          "#53c757",
          "#8B5CF6",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    cutout: "60%",
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 0,
        bottom: 0,
      },
    },
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
  };
  return (
    <div className='bg-[#f7f7f7]'>
      <div className='max-w-[1400px] w-11/12 mx-auto py-10 flex flex-col gap-7 md:gap-10 font-sans'>
        <div className="flex flex-col md:flex-row justify-between gap-5 md:gap-7">

          <div className={ `w-full md:w-1/2 flex flex-col  items-start gap-5 bg-gradient-to-br from-primary  via-30% to-[#53c757] text-white p-6 rounded-2xl hover: transition-colors` }
          >
            <div className="bg-white flex items-center justify-center w-16 h-16 rounded-xl">
              <Image src={ Logo } alt="Logo" width={ 500 } height={ 500 } className="flex justify-center items-center w-7 md:w-10  object-cover" />
            </div>
            <div className="flex flex-col sm:flex-row w-full gap-4 mt-5">
              <div className="bg-white/20 p-3 rounded-lg w-full flex flex-col items-start ">
                <p className="font-light text-white/90">Total User</p>
                <p className="font-mono font-semibold text-xl">{ totalUsers }</p>

                <div className="flex text-sm items-center gap-1">
                  <span className="text-green-600">3%</span>
                  <p className="text-white/80">increase this month</p>
                </div>
              </div>
              <div className="bg-white/20 p-3 rounded-lg w-full flex flex-col items-start">
                <p className="font-light text-white/90">Total Transaction</p>
                <p className="font-mono font-semibold text-xl">{ totalTransactions }</p>

                <div className="flex text-sm items-center gap-1">
                  <span className="text-green-600">12%</span>
                  <p className="text-white/80">increase this month</p>
                </div>
              </div>
              <div className="bg-white/20 p-3 rounded-lg w-full flex flex-col items-start">
                <p className="font-light text-white/90">Total Amount</p>
                <p className="font-mono font-semibold text-xl">{ totalPayments }</p>

                <div className="flex text-sm items-center gap-1">
                  <span className="text-red-600">6%</span>
                  <p className="text-white/80">decrease this month</p>
                </div>
              </div>
            </div>
            <div className="w-full mt-2">
              <div className="flex text-xs justify-between">
                <p className="">Active Users</p>
                <p className="">{ activeUserPercentage }%</p>
              </div>
              <div className="mt-1.5 relative bg-white/60 w-full h-4 rounded-full">
                <div style={ { width: `${activeUserPercentage}%` } } className={ `absolute bg-primary top-0 left-0 w-[${activeUserPercentage}%] h-4 ${activeUserPercentage === "100%" ? "rounded-full" : "rounded-full rounded-r-none"}` }></div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex flex-col items-start gap-7 bg-white rounded-2xl  p-4 md:p-6 ">
            <div className="flex items-center gap-3">
              <Image src={ Pie } alt="Pie Icon" width={ 500 } height={ 500 } className="flex justify-center items-center w-5 md:w-7   object-cover" />

              <div className="flex flex-col items-start gap-0.5 font-sans">
                <h2 className="text-secondary/80 text-base md:text-lg font-medium ">Users Spending </h2>
                <p className="text-secondary/40 text-xs text-light">How users expenses are spread across different categories.</p>
              </div>
            </div>
            <div className="w-full mx-auto">
              <Doughnut data={ userData } options={ options } />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-5 md:gap-7">

          <div className="w-full md:w-[40%] flex flex-col items-start gap-7 bg-white rounded-2xl  p-4 md:p-6 ">
            <div className="flex items-center gap-3">
              <Image src={ Bar } alt="Bar Icon" width={ 500 } height={ 500 } className="flex justify-center items-center w-5 md:w-7   object-cover" />

              <div className="flex flex-col items-start gap-0.5 font-sans">
                <h2 className="text-secondary/80 text-base md:text-lg font-medium ">Transaction Overtime </h2>
                <p className="text-secondary/40 text-xs text-light">Transactions Made Each Month (2024 &minus; 2025)</p>
              </div>
            </div>
            <div className="w-full mx-auto">
              <TransactionOvertime />
            </div>
          </div>
          <div className="w-full md:w-[60%] flex flex-col items-start gap-7 bg-white rounded-2xl  p-6 ">
            <AdminOverview />
          </div>
        </div>
        <UserOverview />
      </div>
    </div>
  )
}

export default Page
