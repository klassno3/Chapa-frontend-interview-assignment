"use server";

import { cookies } from "next/headers";

type User = {
  email: string;
  password: string;
  role: "user" | "admin" | "super-admin";
};

const fakeUsers: User[] = [
  { email: "user@gmail.com", password: "user1234", role: "user" },
  { email: "admin@gmail.com", password: "admin1234", role: "admin" },
  { email: "super@gmail.com", password: "super1234", role: "super-admin" },
];

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = fakeUsers.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return {
      role: null,
      error: "Invalid email or password.",
    };
  }

  // Set secure cookie
  const cookieStore = await cookies();
  cookieStore.set("role", user.role, {
    httpOnly: true,
    path: "/",
  });

  return { role: user.role, error: null };
}
export async function logoutAction(): Promise<{ success: boolean }> {
  const cookieStore = await cookies();
  cookieStore.delete("role");

  return { success: true };
}
