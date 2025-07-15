"use client";

import React, { useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { Button } from "./Button";
import AddTransactionModal from "./AddTransactionModal";

type Transaction = {
  id: string;
  status: "Success" | "Pending" | "Failed";
  category: string;
  amount: number;
  remark: string;
  date: string;
  merchant: string;
  type: "Credit" | "Debit";
};

const transactions: Transaction[] = [
  {
    id: "txn001",
    status: "Success",
    category: "Utilities",
    amount: 200,
    remark: "Electric bill",
    date: "2025-07-14 08:45 AM",
    merchant: "Ethiopia Electric",
    type: "Debit",
  },
  {
    id: "txn002",
    status: "Pending",
    category: "Groceries",
    amount: 350,
    remark: "Weekly market",
    date: "2025-07-13 04:12 PM",
    merchant: "Zemen Supermarket",
    type: "Debit",
  },
  {
    id: "txn003",
    status: "Success",
    category: "Salary",
    amount: 2500,
    remark: "July salary",
    date: "2025-07-01 10:00 AM",
    merchant: "LOFO Payroll",
    type: "Credit",
  },
  {
    id: "txn004",
    status: "Failed",
    category: "Transfer",
    amount: 500,
    remark: "Friend loan",
    date: "2025-06-30 03:30 PM",
    merchant: "Yonas Desta",
    type: "Debit",
  },
  {
    id: "txn005",
    status: "Success",
    category: "Dining",
    amount: 150,
    remark: "Lunch with team",
    date: "2025-07-12 01:15 PM",
    merchant: "Kaldi's Coffee",
    type: "Credit",
  },
  {
    id: "txn006",
    status: "Failed",
    category: "Transport",
    amount: 90,
    remark: "Taxi fare",
    date: "2025-07-11 06:50 PM",
    merchant: "Ride Ethiopia",
    type: "Credit",
  },
  {
    id: "txn007",
    status: "Pending",
    category: "Shopping",
    amount: 800,
    remark: "New shoes",
    date: "2025-07-10 02:40 PM",
    merchant: "Sabegna Fashion",
    type: "Credit",
  },
  {
    id: "txn008",
    status: "Failed",
    category: "Education",
    amount: 1200,
    remark: "Tuition fee",
    date: "2025-07-05 09:00 AM",
    merchant: "Unity University",
    type: "Debit",
  },

];


const statusStyles = {
  Success: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Failed: "bg-red-100 text-red-500",
};

export default function TransactionTable() {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState<Transaction[]>(transactions);
  const [filters, setFilters] = useState({ type: "", status: "", search: "" });

  const filtered = data.filter(txn =>
    (filters.type ? txn.type === filters.type : true) &&
    (filters.status ? txn.status === filters.status : true) &&
    (txn.merchant.toLowerCase().includes(filters.search.toLowerCase()) ||
      txn.remark.toLowerCase().includes(filters.search.toLowerCase()))
  );
  const handleAddTransaction = (txn: Transaction) => {
    setData([txn, ...data]);

  }
  return (
    <div className="overflow-x-auto flex flex-col gap-3 font-sans rounded-xl bg-white p-6">
      <div className="w-full flex mb-4 gap-3 flex-col md:flex-row justify-between items-start md:items-center ">

        <h2 className="text-xl text-secondary/90 font-medium ">Recent Transactions</h2>

        <div className="">
          <Button onClick={ () => setShowModal(true) } title="Add New Transaction" loading={ false } />
        </div>
      </div>
      <div className="flex w-full gap-3 md:gap-5 text-secondary/80 mb-4 items-center flex-wrap">
        <input
          type="text"
          placeholder="Search by merchant or remark"
          className="border-secondary/70 border-[1px] px-4 py-2 text-sm rounded placeholder:text-sm placeholder:font-light placeholder:italic"
          onChange={ (e) => setFilters({ ...filters, search: e.target.value }) }
        />
        <select
          className="border-secondary/70 border-[1px] px-4 py-2 text-sm rounded"
          onChange={ (e) => setFilters({ ...filters, status: e.target.value }) }
        >
          <option value="">All Status</option>
          <option value="Success">Success</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
        </select>
        <select
          className="border-secondary/70 border-[1px] px-4 py-2 text-sm rounded"
          onChange={ (e) => setFilters({ ...filters, type: e.target.value }) }
        >
          <option value="">All Types</option>
          <option value="Credit">Credit</option>
          <option value="Debit">Debit</option>
        </select>
      </div>

      <table className="min-w-full text-sm text-left  ">
        <thead className="bg-primary-100/50">
          <tr className="font-medium text-sm text-secondary/60">
            <th className="min-w-[200px] p-4">Date</th>
            <th className="p-4">Type</th>
            <th className="p-4">Category</th>
            <th className="p-4 min-w-[120px]">Amount</th>
            <th className="p-4 min-w-[150px]">Merchant</th>
            <th className="p-4">Status</th>
            <th className="p-4 min-w-[160px]">Remarks</th>
            <th className="p-4 min-w-[120px]">Actions</th>
          </tr>
        </thead>
        <tbody>
          { filtered.map((txn) => (
            <tr key={ txn.id } className="even:bg-primary-100/15 border-b-[1px] text-secondary/80 border-secondary/20 hover:bg-gray-50">
              <td className="p-4 text-sm text-secondary/60">{ txn.date }</td>
              <td className="p-4 text-sm">{ txn.type }</td>
              <td className="p-4 text-sm">{ txn.category }</td>
              <td className={ `p-4 text-sm  ${txn.type === "Credit" ? "text-green-600" : "text-red-400"}` }>
                { txn.type === "Credit" ? <FaArrowDown className="inline mr-1" /> : <FaArrowUp className="inline mr-1" /> }
                { txn.amount } ETB
              </td>
              <td className="p-4">{ txn.merchant }</td>
              <td className="p-4">
                <span className={ `px-4 py-2 rounded-full text-xs font-medium ${statusStyles[txn.status]}` }>
                  { txn.status }
                </span>
              </td>
              <td className="p-4">{ txn.remark }</td>
              <td className="p-4 space-x-2">
                <button className="text-blue-600 cursor-pointer hover:underline">View</button>
                <button className="text-gray-600 cursor-pointer hover:underline">Export</button>
              </td>
            </tr>
          )) }
          { filtered.length === 0 && (
            <tr>
              <td colSpan={ 8 } className="text-center py-6 text-gray-500">
                No transactions found.
              </td>
            </tr>
          ) }
        </tbody>
      </table>
      { showModal && (
        <AddTransactionModal onAdd={ handleAddTransaction } onClose={ () => setShowModal(false) } />
      ) }
    </div>
  );
}
