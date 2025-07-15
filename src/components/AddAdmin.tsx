"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "./Button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "./Input";
import toast from "react-hot-toast";

type Admin = {
  id: string;
  name: string;
  email: string;
  status: "Pending";
  role: "Super Admin" | "Admin";
};

type Props = {
  onAdd: (admin: Admin) => void;
  onClose: () => void;
};

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  email: z.string().email("Invalid email address"),
});

type FormData = z.infer<typeof schema>;

export default function AddAdminModal({ onAdd, onClose }: Props) {
  const modalRef = useRef<HTMLFormElement>(null);
  const [isAdding, setIsAdding] = useState(false);

  const generateId = () => `${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = (data: FormData) => {
    setIsAdding(true);
    setTimeout(() => {
      onAdd({
        id: generateId(),
        name: data.name,
        email: data.email,
        role: data.role as "Super Admin" | "Admin",
        status: "Pending",
      });
      setIsAdding(false);
      onClose();
      toast.success("Admin added successfully the admin will receive an email to continue!");
    }, 1500);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-secondary/50 flex justify-center items-center z-50">
      <form
        onSubmit={ handleSubmit(onSubmit) }
        ref={ modalRef }
        className="bg-white p-6 rounded-xl w-10/12 md:w-1/2 2xl:w-1/3 space-y-4"
      >
        <h2 className="text-lg text-center text-secondary/80 font-medium">Add Admin</h2>
        <div>
          <label className="block text-sm text-secondary/80 font-medium mb-1" htmlFor="role">
            Role:
          </label>
          <select
            id="role"
            { ...register("role") }
            className="w-full border border-gray-300 rounded px-4 py-2 text-sm text-secondary/90 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select Role</option>
            <option value="Super Admin">Super Admin</option>
            <option value="Admin">Admin</option>
          </select>
          { errors.role && (
            <p className="text-red-500 text-xs mt-1">{ errors.role.message }</p>
          ) }
        </div>
        <Input
          type="text"
          label="Name:"
          placeHolder="Enter full name"
          register={ register("name") }
          error={ errors.name }
          required
          name="name"
        />

        <Input
          type="email"
          label="Email:"
          placeHolder="Enter email address"
          register={ register("email") }
          error={ errors.email }
          required
          name="email"
        />


        <div className="flex justify-end gap-2">
          <div className="">

            <Button onClick={ onClose } title="Cancel" variant="transparent" loading={ false } />
          </div>
          <div className="">

            <Button type="submit" title="Add Admin" loading={ isAdding } />
          </div>
        </div>
      </form>
    </div>
  );
}
