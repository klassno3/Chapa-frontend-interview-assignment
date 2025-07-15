"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "./Button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "./Input";
import toast from "react-hot-toast";

type Transaction = {
  id: string;
  status: "Pending" | "Success" | "Failed";
  category: string;
  amount: number;
  remark: string;
  date: string;
  merchant: string;
  type: "Debit" | "Credit";
};

type Props = {
  onAdd: (txn: Transaction) => void;
  onClose: () => void;
};

function formatDateTo12Hour(date: Date): string {
  const year = date.getFullYear();
  // Months are 0-indexed
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');

  let hours = date.getHours();
  const minutes = `${date.getMinutes()}`.padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert to 12-hour format
  hours = hours % 12 || 12;
  const formattedHours = `${hours}`.padStart(2, '0');

  return `${year}-${month}-${day} ${formattedHours}:${minutes} ${ampm}`;
}


export default function AddTransactionModal({ onAdd, onClose }: Props) {
  const modalRef = useRef<HTMLFormElement>(null);
  const [isAddingTransaction, setIsAddingTransaction] = useState<boolean>(false)
  const generateId = () => `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const newDate = formatDateTo12Hour(new Date())


  // Define Zod schema
  const schema = z.object({
    amount: z.number().min(5, "Amount must be at least be 5"),
    category: z.string().min(1, "Category is required"),
    status: z.string().min(1, "Status is required"),
    date: z.string().min(1, "Date is required"),
    type: z.string().min(1, "type is required"),
    merchant: z.string().min(1, "Merchant is required"),
    remark: z.string().min(3, "Remark must be at least 3 characters."),
  });

  // Infer TypeScript type from schema
  type FormData = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      status: "Pending",
      type: "Debit",
      date: newDate

    }
  });
  const onSubmit = async (data: FormData) => {
    setIsAddingTransaction(true)
    setTimeout(() => {

      onAdd({
        id: generateId(),
        status: data.status as "Pending" | "Success" | "Failed",
        category: data.category,
        amount: data.amount,
        remark: data.remark,
        date: data.date,
        merchant: data.merchant,
        type: data.type as "Debit" | "Credit",
      });
      onClose();
      setIsAddingTransaction(false)
      toast.success("Transaction added successfully!");
    }, 3000)


  }
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);







  return (
    <div className="fixed inset-0 bg-secondary/50 flex justify-center items-center z-50">
      <form onSubmit={ handleSubmit(onSubmit) } ref={ modalRef } className="bg-white p-6 rounded-xl w-10/12 md:w-1/2 2xl:w-1/3 space-y-3">
        <h2 className="text-lg text-center text-secondary/80 font-medium">Add Transaction</h2>
        <Input
          type="number"
          label="Amount:"
          placeHolder="Enter Amount"
          register={ register("amount", { valueAsNumber: true }) }
          error={ errors.amount }
          required={ true }
          name="amount"
        />
        <Input
          type="text"
          label="Merchant/Recipient:"
          placeHolder="Enter Merchant"
          register={ register("merchant") }
          error={ errors.merchant }
          required={ true }
          name="merchant"
        />
        <Input
          type="text"
          label="Category:"
          placeHolder="Enter Category"
          register={ register("category") }
          error={ errors.category }
          required={ true }
          name="category"
        />
        <Input
          type="text"
          label="Remark:"
          placeHolder="Enter Remark"
          register={ register("remark") }
          error={ errors.remark }
          required={ true }
          name="remark"
        />

        <div className="flex justify-end gap-2">
          <div className="">

            <Button onClick={ onClose } title="Cancel" variant="transparent" loading={ false } />
          </div>
          <div className="">

            <Button type="submit" title="Add Transaction" loading={ isAddingTransaction } />
          </div>
        </div>
      </form>
    </div>
  );
}
