"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/Input";
import { Button } from "@/components/Button";
import { useState } from "react";
import { loginAction } from "@/lib/actions/actions";
import toast from "react-hot-toast";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";

// Define Zod schema
const schema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address!"),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

// Infer TypeScript type from schema
type FormData = z.infer<typeof schema>;

const Page = () => {
  const router = useRouter();
  const { setRole } = useAuth()
  const [isLoggingIn, setIsLogingIn] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const onSubmit = async (data: FormData) => {
    try {
      setIsLogingIn(true)
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);
      setTimeout(async () => {
        const { role, error } = await loginAction(formData);
        if (error) {
          toast.error(error)
        }
        setRole(role)
        setIsLogingIn(false)
        if (role) {
          router.push(`/${role}`)
        }
      }, 2000)
    } catch (error) {
      setIsLogingIn(false)
      console.log(error)
    }

  };

  return (
    <div>
      <div className="max-w-[1400px] h-[80vh] w-11/12  md:w-1/2 lg:w-1/3 mx-auto flex flex-col justify-center items-center gap-5 md:gap-7 font-sans  ">
        <h1 className="text-2xl text-secondary font-bold">Login</h1>
        <form onSubmit={ handleSubmit(onSubmit) } className="w-full flex flex-col gap-2 md:gap-3">
          <Input
            type="text"
            label="Email:"
            placeHolder="example@gmail.com"
            register={ register("email") }
            error={ errors.email }
            required={ true }
            name="email"
          />
          <Input
            type="password"
            label="Password:"
            placeHolder="Enter your password"
            register={ register("password") }
            error={ errors.password }
            required={ true }
            name="password"
          />
          <div className="w-full flex justify-center">


            <Button type="submit" title="submit" loading={ isLoggingIn } />
          </div>

        </form>
      </div>
    </div>
  );
}
export default Page;