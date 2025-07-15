"use client";

import React, { useState } from "react";
import { FaUser, FaUserSlash } from "react-icons/fa";
import { UserType, users } from "@/data/data";





type LoadingMap = Record<string, boolean>;

export default function UserOverview() {
  const [loadingMap, setLoadingMap] = useState<LoadingMap>({});
  const [data, setData] = useState<UserType[]>(users);
  const [filters, setFilters] = useState({ status: "", search: "" });

  const filtered = data.filter((user) =>
    (filters.status
      ? filters.status === "Active"
        ? user.isActive
        : !user.isActive
      : true) &&
    (user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      user.email.toLowerCase().includes(filters.search.toLowerCase()))
  );

  const toggleStatus = (id: string) => {
    setLoadingMap((prev) => ({ ...prev, [id]: true }));

    setTimeout(() => {
      setData((prev) =>
        prev.map((user) =>
          user.id === id ? { ...user, isActive: !user.isActive } : user
        )
      );
      setLoadingMap((prev) => {
        const newMap = { ...prev };
        delete newMap[id];
        return newMap;
      });
    }, 1000);
  };
  return (
    <div className="overflow-x-auto flex flex-col gap-3 font-sans rounded-xl bg-white p-6">
      <div className="w-full flex mb-4 gap-3 flex-col md:flex-row justify-between items-start md:items-center ">
        <h2 className="text-xl text-secondary/90 font-medium ">User Overview</h2>

        <div>
          <input
            type="text"
            placeholder="Search by name or email"
            className="border-secondary/70 border-[1px] px-4 py-2 text-sm rounded placeholder:text-sm placeholder:font-light placeholder:italic"
            onChange={ (e) => setFilters({ ...filters, search: e.target.value }) }
          />
          <select
            className="border-secondary/70 border-[1px] px-4 py-2 text-sm rounded ml-3"
            onChange={ (e) => setFilters({ ...filters, status: e.target.value }) }
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      <table className="min-w-full text-sm text-left">
        <thead className="bg-primary-100/50">
          <tr className="font-medium text-sm text-secondary/60">
            <th className="p-4 min-w-[150px]">Name</th>
            <th className="p-4 min-w-[150px]">Email</th>
            <th className="p-4 min-w-[150px]">Status</th>
            <th className="p-4 min-w-[150px]">Transactions</th>
            <th className="p-4 min-w-[150px]">Total Spent</th>
            <th className="p-4 min-w-[150px]">Average</th>
            <th className="p-4 min-w-[150px]">Actions</th>
          </tr>
        </thead>
        <tbody>
          { filtered.map((user) => {
            const total = user.payments.reduce((a, b) => a + b, 0);
            const avg = user.payments.length
              ? (total / user.payments.length).toFixed(2)
              : "0";


            return (
              <tr
                key={ user.id }
                className="even:bg-primary-100/15 border-b-[1px] text-secondary/80 border-secondary/20 hover:bg-gray-50"
              >
                <td className="p-4">{ user.name }</td>
                <td className="p-4">{ user.email }</td>
                <td className="p-4">
                  { user.isActive ? (
                    <span className="text-green-600 ">Active</span>
                  ) : (
                    <span className="text-red-600">Inactive</span>
                  ) }
                </td>
                <td className="p-4">{ user.payments.length }</td>
                <td className="p-4">{ total } ETB</td>
                <td className="p-4">{ avg } ETB</td>
                <td className="p-4">
                  { user.isActive ?

                    <div onClick={ () => toggleStatus(user.id) } className="flex gap-2 text-red-600 items-center cursor-pointer">
                      { loadingMap[user.id] ? <svg
                        className="w-4 h-4 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                        />
                      </svg> :
                        <FaUserSlash />
                      }
                      <p className="">Deactivate</p>
                    </div>
                    :
                    <div onClick={ () => toggleStatus(user.id) } className="flex gap-2 cursor-pointer text-green-600 items-center">
                      { loadingMap[user.id] ? <svg
                        className="w-4 h-4 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                        />
                      </svg> :
                        <FaUser />
                      }
                      <p className="">Activate</p>
                    </div>
                  }


                </td>
              </tr>
            );
          }) }
          { filtered.length === 0 && (
            <tr>
              <td colSpan={ 7 } className="text-center py-6 text-gray-500">
                No users found.
              </td>
            </tr>
          ) }
        </tbody>
      </table>
    </div>
  );
}
