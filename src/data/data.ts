export type UserType = {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  payments: number[];
};

export const users: UserType[] = [
  {
    id: "u1",
    name: "Meles Kebede",
    email: "meles@example.com",
    isActive: false,
    payments: [120, 300, 50],
  },
  {
    id: "u2",
    name: "Liya Tesfaye",
    email: "liya@example.com",
    isActive: false,
    payments: [75, 100],
  },
  {
    id: "u3",
    name: "Samuel Desta",
    email: "samuel@example.com",
    isActive: true,
    payments: [200, 150, 300],
  },
  {
    id: "u4",
    name: "Selamawit Bekele",
    email: "selamawit@example.com",
    isActive: true,
    payments: [400, 250],
  },
  {
    id: "u5",
    name: "Abebe Alemu",
    email: "abebe@example.com",
    isActive: false,
    payments: [90],
  },
  {
    id: "u6",
    name: "Tigist Tadesse",
    email: "tigist@example.com",
    isActive: true,
    payments: [130, 70, 220],
  },
  {
    id: "u7",
    name: "Kebede Abebe",
    email: "kebede@example.com",
    isActive: true,
    payments: [500],
  },
  {
    id: "u8",
    name: "Genet Solomon",
    email: "genet@example.com",
    isActive: false,
    payments: [60, 80],
  },
];
export type AdminType = {
  id: string;
  name: string;
  email: string;
  role: "Super Admin" | "Admin";
  status: "Pending" | "Active" | "Inactive";
};

export const admins: AdminType[] = [
  {
    id: "a1",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    status: "Active",
    role: "Super Admin",
  },
  {
    id: "a2",
    name: "Bob Smith",
    email: "bob.smith@example.com",
    status: "Pending",
    role: "Admin",
  },
  {
    id: "a3",
    name: "Clara Oswald",
    email: "clara.oswald@example.com",
    status: "Inactive",
    role: "Admin",
  },
  {
    id: "a4",
    name: "David Tennant",
    email: "david.tennant@example.com",
    status: "Active",
    role: "Super Admin",
  },
  {
    id: "a5",
    name: "Eva Green",
    email: "eva.green@example.com",
    status: "Inactive",
    role: "Admin",
  },
];
