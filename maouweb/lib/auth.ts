export type AdminRole = "real" | "acting";

export interface AdminUser {
  email: string;
  password: string;
  role: AdminRole;
  displayName: string;
}

const realAdminEmail = process.env.MAOU_REAL_ADMIN_EMAIL || "motloungthapelo462@gmail.com";
const realAdminPassword = process.env.MAOU_REAL_ADMIN_PASSWORD || "maou123secure";

export const ADMIN_USERS: AdminUser[] = [
  {
    email: realAdminEmail,
    password: realAdminPassword,
    role: "real",
    displayName: "Real Admin",
  },
  {
    email: "acting1@maou.com",
    password: "actingpassword1",
    role: "acting",
    displayName: "Acting Admin 1",
  },
  {
    email: "acting2@maou.com",
    password: "actingpassword2",
    role: "acting",
    displayName: "Acting Admin 2",
  },
  {
    email: "acting3@maou.com",
    password: "actingpassword3",
    role: "acting",
    displayName: "Acting Admin 3",
  },
  {
    email: "acting4@maou.com",
    password: "actingpassword4",
    role: "acting",
    displayName: "Acting Admin 4",
  },
];

export function findAdmin(email: string, password: string) {
  return ADMIN_USERS.find(
    (admin) => admin.email === email && admin.password === password
  );
}
