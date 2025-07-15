"use client";

import React, { useState } from "react";
import { admins, AdminType } from "@/data/data";
import { Button } from "./Button";
import AddAdminModal from "./AddAdmin";
import { FaUser, FaUserSlash } from "react-icons/fa";

type Status = "Pending" | "Active" | "Inactive";

type LoadingMap = Record<string, boolean>;
export default function AdminOverview() {
  const [data, setData] = useState<AdminType[]>(admins);
  const [showModal, setShowModal] = useState(false);
  const [loadingMap, setLoadingMap] = useState<LoadingMap>({});
  const [activateMap, setActivateMap] = useState<LoadingMap>({});
  const [filters, setFilters] = useState<{ status: Status | ""; search: string }>({
    status: "",
    search: "",
  });

  // Filter admins by status and search by name/email
  const filtered = data.filter(
    (admin) =>
      (filters.status ? admin.status === filters.status : true) &&
      (admin.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        admin.email.toLowerCase().includes(filters.search.toLowerCase()))
  );

  // Remove admin by id
  const removeAdmin = (id: string) => {
    setLoadingMap((prev) => ({ ...prev, [id]: true }));

    setTimeout(() => {
      setData((prev) => prev.filter((admin) => admin.id !== id));
      setLoadingMap((prev) => {
        const newMap = { ...prev };
        delete newMap[id];
        return newMap;
      });
    }, 1000);
  };
  const handleAddAdmin = (txn: AdminType) => {
    setData([txn, ...data]);

  }


  // Toggle status between Active and Inactive/Pending
  const toggleStatus = (id: string) => {
    setActivateMap((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setData((prev) =>
        prev.map((admin) => {
          if (admin.id === id) {
            if (admin.status === "Active") {
              return { ...admin, status: "Inactive" };
            } else {
              return { ...admin, status: "Active" };
            }
          }
          return admin;
        })
      );
      setActivateMap((prev) => {
        const newMap = { ...prev };
        delete newMap[id];
        return newMap;
      });
    }, 1000);
  };

  return (
    <div className="w-full overflow-x-auto flex flex-col gap-3 font-sans rounded-xl bg-white p-3">
      <div className="w-full flex mb-4 gap-3 flex-col md:flex-row justify-between items-start md:items-center">
        <h2 className="text-xl text-secondary/90 font-medium">Admin Overview</h2>
        <div className="">
          <Button onClick={ () => setShowModal(true) } title="Add New Admin" loading={ false } />
        </div>
      </div>

      <div>
        <input
          type="text"
          placeholder="Search by name or email"
          className="border-secondary/70 border-[1px] px-4 py-2 text-sm rounded placeholder:text-sm placeholder:font-light placeholder:italic"
          onChange={ (e) => setFilters({ ...filters, search: e.target.value }) }
        />
        <select
          className="border-secondary/70 border-[1px] px-4 py-2 text-sm rounded ml-3"
          onChange={ (e) => setFilters({ ...filters, status: e.target.value as Status | "" }) }
          value={ filters.status }
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <table className="min-w-full text-sm text-left">
        <thead className="bg-primary-100/50">
          <tr className="font-medium text-sm text-secondary/60">
            <th className="p-4 min-w-[150px]">Name</th>
            <th className="p-4 min-w-[150px]">Email</th>
            <th className="p-4 min-w-[150px]">Role</th>
            <th className="p-4">Status</th>
            <th className="p-4  min-w-[200px]">Actions</th>
          </tr>
        </thead>
        <tbody>
          { filtered.map((admin) => (
            <tr
              key={ admin.id }
              className="even:bg-primary-100/15 border-b-[1px] text-secondary/80 border-secondary/20 hover:bg-gray-50"
            >
              <td className="p-4">{ admin.name }</td>
              <td className="p-4">{ admin.email }</td>
              <td className="p-4">{ admin.role }</td>
              <td className="p-4">
                { admin.status === "Active" && (
                  <span className="text-green-600">{ admin.status }</span>
                ) }
                { admin.status === "Pending" && (
                  <span className="text-yellow-600">{ admin.status }</span>
                ) }
                { admin.status === "Inactive" && (
                  <span className="text-red-500 ">{ admin.status }</span>
                ) }
              </td>
              <td className="flex gap-4 p-4 items-center">
                <button
                  onClick={ () => removeAdmin(admin.id) }
                  className="text-red-500 hover:underline"
                  aria-label={ `Remove admin ${admin.name}` }
                >
                  { loadingMap[admin.id] ? <div className="flex items-center gap-2">
                    <svg
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
                    </svg>
                    <p className="">Remove</p>

                  </div> : "Remove" }
                </button>
                { admin.status === "Active" ?

                  <div onClick={ () => toggleStatus(admin.id) } className="flex gap-2 text-red-500 items-center cursor-pointer">
                    { activateMap[admin.id] ? <svg
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
                  <div onClick={ () => toggleStatus(admin.id) } className="flex gap-2 cursor-pointer text-green-600 items-center">
                    { activateMap[admin.id] ? <svg
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
          )) }
          { filtered.length === 0 && (
            <tr>
              <td colSpan={ 4 } className="text-center py-6 text-gray-500">
                No admins found.
              </td>
            </tr>
          ) }
        </tbody>
      </table>
      { showModal && (
        <AddAdminModal onAdd={ handleAddAdmin } onClose={ () => setShowModal(false) } />
      ) }
    </div>
  );
}
