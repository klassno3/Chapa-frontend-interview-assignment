"use client";
import React, { useState } from 'react'
import Chip from "../../../public/chip.png"
import Logo from "../../../public/logo-white.svg"
import Pie from "../../../public/pie.svg"
import Image from 'next/image'
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import TransactionTable from '@/components/TransactionTable';

ChartJS.register(ArcElement, Tooltip, Legend);
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

const data = {
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
const Page = () => {
  const [showBalance, setShowBalance] = useState(true);
  const balance = 45000;
  return (
    <div className='bg-[#f7f7f7] '>
      <div className='max-w-[1440px] w-11/12 mx-auto py-10 bg-[#f7f7f7] flex flex-col gap-10'>
        <div className=' flex flex-col md:flex-row gap-5 md:gap-7  justify-between'>
          <div
            className={ `w-full md:w-1/2 flex flex-col  items-start gap-5 bg-gradient-to-br from-primary  via-30% to-[#53c757] text-white p-6 rounded-2xl hover: transition-colors` }
          >
            <div className="w-full flex flex-col gap-3 items-start  ">
              <div className="font-mono font-thin text-white/80">Bankly Wallet</div>

              <Image src={ Chip } alt="Bank Logo" width={ 500 } height={ 500 } className="flex justify-center items-center w-12 md:w-18   object-cover mt-4" />

              <div className="w-full flex justify-between items-center">
                <p className="text-white text-lg font-thin font-mono">+251*******28</p>
                <div className="flex flex-col item-start">
                  <p className="font-mono font-light text-white/80 text-sm">Total Balance</p>
                  <div className="flex items-center gap-5">

                    <button
                      onClick={ () => setShowBalance(!showBalance) }
                      className="cursor-pointer text-white/90 text-sm hover:text-white"
                    >
                      { showBalance ? <FaEyeSlash size={ 18 } /> : <FaEye size={ 18 } /> }
                    </button>
                    <p className="font-mono text-xl">
                      { showBalance ? balance.toLocaleString() : "*".repeat(balance.toLocaleString().length) }
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-between items-center mt-3">

                <p className="text-white font-mono">Betelhem Kirub</p>

                <Image src={ Logo } alt="Bank Logo" width={ 500 } height={ 500 } className="flex justify-center items-center w-7 md:w-10  object-cover" />
              </div>
            </div>

          </div>
          <div className="w-full md:w-1/2 flex flex-col items-start gap-7 bg-white rounded-2xl  p-6 ">
            <div className="flex items-center gap-3">
              <Image src={ Pie } alt="Pie Icon" width={ 500 } height={ 500 } className="flex justify-center items-center w-5 md:w-7   object-cover" />

              <div className="flex flex-col items-start gap-0.5 font-sans">
                <h2 className="text-secondary/80 text-base md:text-lg font-medium ">Your Spending by Category</h2>
                <p className="text-secondary/40 text-xs text-light">How your expenses are spread across different categories.</p>
              </div>
            </div>
            <div className="w-full mx-auto">
              <Doughnut data={ data } options={ options } />
            </div>
          </div>
        </div>
        <TransactionTable />
      </div>
    </div>
  )
}

export default Page;
